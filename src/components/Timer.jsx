import { useEffect, useState } from "react";


function formatTimer(seconds){
    const hour=String(Math.floor(seconds/3600)).padStart(2,"0");
    const minute=String(Math.floor((seconds%3600)/60)).padStart(2,"0");
    const secs=String((seconds%60)).padStart(2,"0");

    return {hours:hour,minutes:minute,seconds:secs};
}

function calculateTime(hours, minutes, seconds) {
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}

// ------------------------------------------------------------------------------------

const Timer=()=>{
    const [editState,setEditState]=useState({field:"",value:""});
    const [isRunning,setIsRunning]=useState(false);
    const [timerInSec,setTimerInSec]=useState(0);


    useEffect(()=>{
        let interval=null;
        if(isRunning && timerInSec>0){
            interval=setInterval(()=>{
                setTimerInSec((prevTime)=>prevTime-1)
                console.log(timerInSec);
            },1000)
        }
        // else{
        //     clearInterval(interval);
        // }
    
        return ()=>clearInterval(interval);
    },[isRunning,timerInSec])
    
    
    function OnStart(){
        if(timerInSec>0){
            setIsRunning(true);
        }
        // console.log(timerInSec);
        
    }
    function OnStop(){
        setIsRunning(false);
    }
    function OnReset(){
        setIsRunning(false);
        setTimerInSec(0)
        
    }
    
    function handleEditField(field){
        setIsRunning(false);
        const formattedTime=formatTimer(timerInSec);
        setEditState({ field, value: formattedTime[field] });// Other method to access objects key 
    }
    
    function handleInputChange(e){
        setEditState((prev)=>({...prev,value:e.target.value}));
    }
    function saveEdit(){
        if(!editState.field) return;
        const formattedTime=formatTimer(timerInSec);
        formattedTime[editState.field] = editState.value.padStart(2, "0");
        const updatedSeconds = calculateTime(
            formattedTime.hours,
            formattedTime.minutes,
            formattedTime.seconds
        );
        setTimerInSec(updatedSeconds); 
        setEditState({ field: null, value: "" })
    }


    return (
        <>
            <div>
                <div className="TimerDiv">
                <h1>
                        {editState.field === "hours" ? (
                            <input
                                type="number"
                                value={editState.value}
                                onChange={handleInputChange}
                                onBlur={saveEdit}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEditField("hours")}>
                                {formatTimer(timerInSec).hours}
                            </span>
                        )}
                        :
                        {editState.field === "minutes" ? (
                            <input
                                type="number"
                                value={editState.value}
                                onChange={handleInputChange}
                                onBlur={saveEdit}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEditField("minutes")}>
                                {formatTimer(timerInSec).minutes}
                            </span>
                        )}
                        :
                        {editState.field === "seconds" ? (
                            <input
                                type="number"
                                value={editState.value}
                                onChange={handleInputChange}
                                onBlur={saveEdit}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEditField("seconds")}>
                                {formatTimer(timerInSec).seconds}
                            </span>
                        )}
                    </h1>
                </div>
                
            
            <div>
                <button className="Btn" id ="StartBtn" onClick={OnStart}>Start</button>
        
                <button className="Btn" id="StopBtn" onClick={OnStop}>Stop</button>
        
                <button className="Btn" id="ResetBtn" onClick={OnReset}>Reset</button>
            </div>
            </div>
        </>
    )
}

export default Timer;

