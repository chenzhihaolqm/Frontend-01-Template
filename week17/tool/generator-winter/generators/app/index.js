var Generator = require('yeoman-generator');
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  init(){
	  this.log('method init just ran');
  }
  writting(){
    this.fs.copyTpl(
      this.templatePath('./index.html'),
      this.destinationPath('public/index.html'),
      {
        title: 'Templating with Yeoman'
      }
    );
  }
  //  async prompting() {
  //   this.answers = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Your project name",
  //       default: this.appname // Default to current folder name
  //     }
  //   ]);

  //   this.log("app name", this.answers.name);
  // }
  // writing(){
	//   var p = {
	// 	  dependencies: {
	// 		  [this.answers.name]: "*"
	// 	  }
	//   };
	//   this.log(p);
	//   this.fs.extendJSON(this.destinationPath('package.json'), p)
  // }
  // install(){
	//   this.npmInstall();
  // }
};