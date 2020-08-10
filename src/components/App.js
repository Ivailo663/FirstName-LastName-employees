import React, { Component } from "react";
import MainTable from './MainTable'
import ChooseFile from './ChooseFile'
import UploadFile from './UploadFile'
import ResultsTable from './ResultsTable'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        uploadedFile:undefined,
        fileName:undefined,
        component:"choose-file",
        res:null,
        finalRes:null,
        inputCleared:false
    }
  }
  componentDidUpdate(prevProps,prevState){
    if(this.state.uploadedFile !== prevState.uploadedFile){
      if(this.state.uploadedFile){
        this.setState({component:"upload-file"})
      }
    }
    if(this.state.fileSent !== prevState.fileSent){
      this.setState({component:"main-table"})
    }
  }
  uploadFile = (event) =>{
    this.setState({uploadedFile:event.target.files[0], fileName:event.target.files[0].name})
  }

  collectResFromBE = (response) =>{
    this.setState({res:response})
  }
  collectFinalResFromBE = (response) =>{
    this.setState({finalRes:response})
  }
  goToMainTable = () =>{
    this.setState({component:"main-table", finalRes:""})
  }
  goToResultsTable = () =>{
    this.setState({component:"results-table"})
  }
  goToChooseFile = () =>{
    this.setState({component:"choose-file", uploadedFile:""})
  }
  clearTable = () =>{
    this.setState({inputCleared:!this.state.inputCleared,   res:"", uploadedFile:null})
  }
  manageScreens = () => {
    switch(this.state.component){
      case "choose-file":
        return <ChooseFile upload={(event)=>this.uploadFile(event)}/>
      case "upload-file":
        return  <UploadFile fileName={this.state.fileName} file={this.state.uploadedFile}   toMaintable={this.goToMainTable} />
      case "main-table":
        return <MainTable data={this.state.res} 
                          colletRes={(response)=>this.collectResFromBE(response)}  
                          collectFinalRes={(respone)=>this.collectFinalResFromBE(respone)} 
                          toResultsTable={this.goToResultsTable}
                          clear={this.clearTable}
                          toChooseFile={this.goToChooseFile}
                          /> 
      case "results-table":
        return <ResultsTable data={this.state.finalRes} toMaintable={this.goToMainTable}  clear={this.clearTable}/>
    }
  }
  render() {
    return (
      <div className="table-top-container"> 

          {this.manageScreens()}
 
      </div>

    );
  }
}

export default App;
