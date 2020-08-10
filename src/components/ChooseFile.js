import React,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
const ChooseFile = (props) => {

   
    return (
        <section className="table-main">
            <div className="info-holder">
                <p className="info">Find the 2 employees assigned on same project for longest amount of time.</p>
                    <span>
                        <FontAwesomeIcon
                        icon="info-circle"
                        className="info-icon"
                        />
                    </span>
            </div>
            <div className="upload-file-wrapper">
                <form>
                <label htmlFor="chose-file" className="upload-holder">Choose file from your pc
                            <span>
                                <FontAwesomeIcon
                                icon="cloud-upload-alt"
                                className="upload"
                                />
                            </span>
                            <input  id="chose-file" type="file" accept=".txt" name="myFile" onChange={props.upload} key={props.inputCleared }/>
                    </label>
                </form>

            <p className="file-type-info">.txt files only</p>
            </div>
            <p class="made-by">By Ivaylo Georgiev</p>       
        </section> 
    )
}

export default ChooseFile
