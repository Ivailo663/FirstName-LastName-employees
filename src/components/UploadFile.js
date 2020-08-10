import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import Txt from '../../public/gallery/txt.svg'
import axios from 'axios'

const UploadFile = (props)=> {
    const [isFileSent, setIsFileSent] = useState(undefined)
    const sendToBE = () =>{
        setIsFileSent(true)

        const data = new FormData()
        data.append('myFile',props.file)
        axios.post('http://localhost:3002/send-file', data).then((res)=>{
            console.log(res, 'all good!')
            props.toMaintable()
        }).catch((err)=>console.log(err))

    }

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
                <img src={Txt}/>
                <p className="file-type-info">{props.fileName}</p>
                <span className="check-holder">
                        <FontAwesomeIcon
                        icon="check-circle"
                        className="check"
                        />
                </span>
            </div>
            <div className="controllers-holder">
            <button className="controller btn-blue" onClick={sendToBE}>Upload
                    <span>
                    <FontAwesomeIcon
                        icon="cloud-upload-alt"
                        className="upload"
                        />
                    </span>
             
                   
            </button>
            </div>
        </section> 
    )
}

export default UploadFile
