function getStyle(ele) {
  if(!ele.style) {
      ele.style = {};
  }
  for (const prop in ele.computedStyle) {
      const value = ele.style[prop] = ele.computedStyle[prop].value;
      if(value.toString().match(/px$/)) {
        ele.style[prop] = parseInt(value);
      }
      if(value.toString().match(/^[0-9]+$/)){
        ele.style[prop] = parseInt(value);
      }
  }
  return ele.style;
}
function layout(ele) {
  if(!ele.computedStyle) {
    return;
  }
  const eleStyle = getStyle(ele);
  if(eleStyle.display !== 'flex') {
      return;
  }
  const items = ele.children.filter(item => item.type === 'element' );
  
  ['width', 'height'].forEach(size => {
      if(style[size] === 'auto' || style[size] === ''){
          style[size] = null;
      }
  })

  const style = eleStyle;
  if(!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';
  }
  if(!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch';
  }
  if(!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if(!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';
  }
  if(!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }

  let mainSize, mainStart, mainEnd, mainSign, mainBase,
      crossSize, crossStart, crossEnd, crossSign, crossBase;
  if(style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';

  } else if(style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
      
  } else if(style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
      
  } else if(style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
      
  } 
  if(style.flexWrap === 'wrap-reverse') {
      const tmp = crossStart;
      crossStart = crossEnd;
      crossEnd = tmp;
      crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  let isAutoMainSize = false;
  if(!style[mainSize]) {
      eleStyle[mainSize] = 0;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);
        if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
          eleStyle[mainSize] = eleStyle[mainSize] + itemStyle[mainSize];    
        }
      }
      isAutoMainSize = true;
  }

  const flexLine = [];
  const flexLines = [flexLine];
  let mainSpace = eleStyle[mainSize];
  let crossSpace = 0;
  
  for (let i = 0; i < item.length; i++) {
    const item = items[i];
    const itemStyle = getStyle(item);
    if(itemStyle[mainSize] === null) {
        itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      lexLine.push(item);
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
          mainSpace -= itemStyle[mainSize];
          if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
            crossSpace = Math.max(crossSpace, itemStyle[crossSize])    
          }
      } else {
        if (itemStyle[mainSize] > style[mainSize]) {
          itemStyle[mainSize] = style[mainSize]
        }
        if (mainSpace < itemStyle[mainSize] ) {
          flexLine.mainSpace = mainSpace;
          flexLine.crossSpace = crossSpace;
          flexLine = [];
          flexLines.push(flexLine);
          flexLine.push(item);
          mainSpace = style[mainSize];
          crossSize = 0;
        } else {
          flexLine.push(item)  
        }
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
          crossSpace = Math.max(crossSpace, itemStyle[crossSize]); 
        }
        mainSpace -= itemStyle[mainSize];
      }
    }
    flexLine.mainSpace = mainSpace;

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
      flexLine.crossSpace = (style[crossSizze] !== undefined) ? style[crossSize] : crossSpace;
    } else {
      flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
      var scale = style[mainSize] / (style[mainSize] - mainSpace);
      var currentMain = mainBase;
      for(let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);
        if (itemStyle.flex) {
          itemStyle[mainSize] = 0;  
        }

        itemStyle[mainSize] = itemStyle[mainSize] * scale;
        itemStyle[mainStart] = currentMain;
        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
        currentMain = itemStyle[mainEnd];
      }
    } else {
      flexLines.forEach(items => {
        const mainSpace = items.mainSpace;
        const flexTotal = 0;
        for(let i = 0; i < items.length; i++ ){
          const item = items[i];
          const itemStyle = getStyle(item);
          if (itemStyle.flex !==null && (itemStyle.flex !== (void 0))) {
            flexTotal += itemStyle.flex;
            continue;   
          }
        }
        if (flexTotal > 0) {
          const currentMain = mainBase;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);
            if (itemStyle.flex) {
              itemStyle[mainSize] = (mainSpace / flexTotal) * item.flex;
            }
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
          }
        } else {
          if (style.justifyContent === 'flex-start') {
            var currentMain = mainBase;
            var step = 0;
          }
          if (style.justifyContent === 'flex-end') {
            var currentMain = mainSpace * mainSign + mainBase;
            var step = 0;
          }
          if (style.justifyContent === 'center') {
            var currentMain = mainSpace / 2 * mainSign + mainBase;
            var step = 0;
          }
          if (style.justifyContent === 'space-between') {
            var step = mainSpace / (items.length - 1) * mainSign;
            var currentMain = mainBase;
          }  
          if (style.justifyContent === 'space-around') {
            var step = mainSpace / items.length * mainSign;
            var currentMain = step / 2 + mainBase;
         }
         for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item); /// mu you
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd] + step;
         }
        }
      })
    }

    var crossSpace;
    if(!style[crossSize]) {
      crossSpace = 0;
      eleStyle[crossSize] = 0;
      for (let i = 0; i < flexLines.length; i++ ) {
        eleStyle[crossSize] = eleStyle[crossSize] + flexLines[i].crossSpace;
      }  
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace;
        }
    }
    if (style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }
    var lineSize = style[crossSize] / flexLines.length;
    var step;
    if (style.alignContent === 'flex-start') {
        crossBase += 0;
        step = 0;
    }
    if (style.alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace;
        step = 0;
    } 
    if (style.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }     
    if (style.alignContent === 'space-between') {
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }   
    if (style.alignContent === 'space-around') {
        step = crossSpace / (flexLines.length);
        crossBase += crossSign * step / 2;
    }        
    if (style.alignContent === 'stretch') {
        crossBase += 0;
        crossBase = 0;
    }
    flexLines.forEach(iems => {
        var lineCrossSize = style.alignContent === 'stretch' ?
        items.crossSpace + crossSpace / flexLines.length :
        items.crossSpace;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);
            const align = itemStyle.alignSelf || style.alignItems;
            if (itemStyle[crossSize] === null) {
                itemStyle[crossSize] = (align === 'stretch') ?
                lineCrossSize : 0;
            }
            if (align === 'flex-start') {
                itemStyle[crossSize] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
            }
            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) /2;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0) ? 
                itemStyle[crossSize] : lineCrossSize))
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            }            
        }
        crossBase += crossSign * (lineCrossSize + step)
    })   
}

module.exports = layout;