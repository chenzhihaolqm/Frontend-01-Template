export function enableGesture(element){
    let contexts = Object.create(null);
    let MOUSE_SYMBOL = Symbol('mouse');
    if(document.ontouchstart !== null){
        element.addEventListener('mousedown', (event)=>{
            contexts[MOUSE_SYMBOL] = Object.create(null);
            
            start(event, contexts[MOUSE_SYMBOL]);
            console.log( 'start',contexts[MOUSE_SYMBOL]);
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL]);
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL]);
                element.removeEventListener('mousemove', mousemove)
                element.removeEventListener('mouseend', mouseend)
                delete contexts[MOUSE_SYMBOL];
            }
            element.addEventListener('mousemove', mousemove)
            element.addEventListener('mouseup', mouseend)
        })
    } else {
        element.addEventListener('touchstart', event => {
            for(let touch of event.changedTouches){
                contexts[touch.identifier] = Object.create(null);
                start(touch, contexts[touch.identifier]);
            }
           
        })
        element.addEventListener('touchmove', event => {
            for(let touch of event.changedTouches){
                move(touch, contexts[touch.identifier]);
            }
        })
        element.addEventListener('touchend', event => {
            for(let touch of event.changedTouches){
                end(touch, contexts[touch.identifier]);
                delete contexts[touch.identifier];
            }
        })
        element.addEventListener('touchcancel', event => {
            for(let touch of event.changedTouches){
                cancel(touch);
                delete contexts[touch.identifier];
            }
        })
    }
    

    
    function start(point, context){
        context.startX = point.clientX,  context.startY = point.clientY;
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.moves = [];
        dispatchEvent('start', point, context);
        context.timeoutHandler = setTimeout(() => {
            if(context.isPan)
                return;
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            console.log('pressstart')
        }, 500);
    }
    function move(point, context){
        if(!context){
            return;
        }
        const dx = point.clientX - context.startX;
        const dy = point.clientY - context.startY;
        if(dx ** 2 + dy ** 2 > 100 && !context.isPan){
            if(context.isPress){
                dispatchEvent('presscancel', point, context);
            }
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            console.log('panstart')
            dispatchEvent('panstart', point, context);
        }
        if(context.isPan){
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            });
            context.moves = context.moves.filter(record => {
                return Date.now() - record.t < 300;
            })
            dispatchEvent('pan', point, context);
        }
    }
    function end(point, context){
        if(!context){
            return;
        }
        const dx = point.clientX - context.startX;
        const dy = point.clientY - context.startY;
 
        if(context.isTap){
            console.log('tap')
            dispatchEvent('tap', point, context);
        } else if(context.isPan){
            let record = context.moves[0];
            let speed = Math.sqrt((dx - record.dx) ** 2 + (dy- record.dy) ** 2)/(Date.now() - record.t)
            let isFlick = speed > 2.5;
            if(isFlick){
                console.log('flick');
                dispatchEvent('flick', point, context, {
                    speed,
                    isFlick
                });
            }
            dispatchEvent('panend', point, context, {
                speed,
                isFlick
            });
        }else if(context.isPress){
            dispatchEvent('pressend', point, context);
        }
        clearTimeout(context.timeoutHandler);
    }
    function cancel(point, context){
        clearTimeout(context.timeoutHandler);
        //console.log('cancel', point.clientX, point.clientY);
    }
    function dispatchEvent(eventStr, point, context, params){
        params = typeof params === 'object' ? params : {};
        let e = new CustomEvent(eventStr);
        Object.assign(e, {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY 
        }, params);
        element.dispatchEvent(e);
    }
    // 监听 -> 识别 -> 派发
    // tap
    // pan  -- panstart panmove panend
    // flick 
    // press -- pressstart pressmove pressend
    
}
