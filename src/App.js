import React from 'react';
import marked from 'marked'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      editorInput: ""
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(input){
    this.setState({
      editorInput: input
    })

    console.log('----------------------')
    console.log(input)
    console.log('----------------------')
  }


  render(){
    return (
      <div className="App">
          <Editor handleInput={this.handleInput}/>
          <Viewer markdown={this.state.editorInput}/>
      </div>
    )

  }  
}




class ToolBar extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

    return (
    <section>
      <span>{this.props.title}</span>
    </section>)
  }
}


class Viewer extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      md: this.props.markdown
    }
    this.mdToHtml = this.mdToHtml.bind(this)
  }

  mdToHtml(){
    return marked(this.props.markdown) 
    
  }


  render(){

    return (
      <div>
        <ToolBar title="Viewer"/>
        <section className='viewer'>
            <article id="preview" className="converted" dangerouslySetInnerHTML={ {__html: this.mdToHtml()} }>
            </article>
        </section>
      </div>)
  }
}



class Editor extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      input:  `
    
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
      `
    }

    this.props.handleInput(this.state.input)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({
      input: e.target.value
    })

    this.props.handleInput( e.target.value)
  }

  render(){

    

    return (
      <div>
        <ToolBar title="Editor"/>
        <section className='editor'>
          <textarea id="editor"  onChange={this.handleChange} value={this.state.input}/>
        </section>
      </div>)
  }
}

export default App;
