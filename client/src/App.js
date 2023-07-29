import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

import "react-datepicker/dist/react-datepicker.css";

function App() {
	const [startDate, setStartDate] = useState("");
	const[data, setData] = useState("");

	let imageStyle = {
		height: "1200px",
		width: "1400px",
		backgroundImage:
		'url("https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg")',
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		color: "white", 
		
	 };

	 let divStyle = {
		display: 'flex',
		flexDirection:'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
	 };

	 const submitHandler = (event) => {
		event.preventDefault();
		const stocksTicker = event.target.stocksTicker.value;
		const inputDate = event.target.inputDate.value;
		const url = "http://localhost:5001/api/fetchStockData";
		axios.post(url,{
			stocksTicker,
			inputDate
		})
		.then(response => {
			if(response.status === 200){
				setData(response.data)
				document.getElementById("inputDiv").style.display = "none";
				document.getElementById("outputDiv").style.display = "block";
				document.getElementById("errorDiv").style.display = "none";
			}else{
				document.getElementById("inputDiv").style.display = "block";
				document.getElementById("outputDiv").style.display = "none";
				document.getElementById("errorDiv").style.display = "block";
			}
		})
		.catch(error => {
			document.getElementById("inputDiv").style.display = "block";
			document.getElementById("outputDiv").style.display = "none";
			document.getElementById("errorDiv").style.display = "block";
		});
	 }
	return (

		<div className = "image" style={imageStyle}>
			<div style={divStyle}>
				<div id="inputDiv" className="row">
					<form onSubmit={submitHandler}>
						<label>Enter stock code:
							<input type="text" name = "stocksTicker" placeholder="Enter Stock Ticker"/>
						</label><br></br><br></br>

						<label> Select the date:
						<DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} 
						name="inputDate" dateFormat="yyyy-MM-dd"  placeholderText="yyyy-mm-dd" />
						</label><br></br><br></br>

						<button>Submit</button>
					</form>
				</div>
				
				<div className="row" id="outputDiv" style={{display: "none", 
				 fontSize:"30px", color:"white", padding:"20px",
				 }}>
					<label >Open Price: {data.open}</label><br></br><br></br>
					<label >Close Price: {data.close}</label><br></br><br></br>
					<label >High Price: {data.high}</label><br></br><br></br>
					<label >Low Price: {data.low}</label><br></br><br></br>
					<label >Volume: {data.volume}</label><br></br>
				</div>

				<div id="errorDiv" style={{display:"none"}} >
				 		<br></br>
						<p> <span style={{color:"red"}}>***</span> No Data Found for the selected date.
						</p>
				</div>
			</div>
			
		</div>
	  )
}

export default App;