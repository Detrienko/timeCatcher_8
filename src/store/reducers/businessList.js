import * as actionTypes from '../actions/actionsTypes';

const initialState = {
	business: [
		{	
			id: 0,
			title: 'Test business',
			totalHours: {
      		  hours: 0,
      		  minutes: 0
      		},
			goalHours: 10000,
      		daylyGoal: {
      		  hours: 2,
      		  minutes: 0
      		},			
      		weeklyGoal: {
      		  hours: 14,
      		  minutes: 0
      		},
      		monthlyGoal:{
      			hours: 56,
      			minutes: 0
      		},
			description: 'It\'s a test bussiness.',
			progress: 0, // percent
			isShown: true,

			// STOPWATCH
			stopWatchIsShown: true,
      		currentStopwatchTime: {
				hours: '00',
				minutes: '00',
				seconds: '00',
				centiseconds: '00'
			},
      		timerTime: 0,
      		timerStart: 0,
      		timerId: null,
      		timerOn: false,

			// COUNTDOWN
			countDownIsShown: false,
			currentCountdownTime: {
        		hours: '00',
        		minutes: '00',
        		seconds: '00',
     		},
      		timerTimeCountDown: 0,

      		currentMiniStopwatchTime: {
				hours: '00',
				minutes: '00',
				seconds: '00'
			},
			miniTimerTime: 0
		},
	]	
}

const reducer = (state=initialState, action) => {

	switch(action.type){
		case actionTypes.ADD_BUSINESS:
			let oldBusiness = state.business;
			let newBusiness = [...oldBusiness, action.data];
			let newState = {
				business: newBusiness
			} 
			return newState;

		case actionTypes.SWITCH_BUSINESS_TAB:
			let oldBusiness2 = state.business;
			let index = oldBusiness2.findIndex((el)=>el.id==action.id);
			let newBusiness2 = [...oldBusiness2];
			newBusiness2.forEach((item)=>{
				item.isShown = false;
			})
			newBusiness2[index].isShown = true;
			let newState2 = {
				business: newBusiness2
			}
			return newState2;

		case actionTypes.SAVE_CURRENT_STOPWATCH_TIME:
			let oldBusiness3 = state.business;
			let index3 = oldBusiness3.findIndex((el)=>el.id==action.id);
			let newBusiness3 = [...oldBusiness3];
			newBusiness3[index3].currentStopwatchTime = {...action.time};
			newBusiness3[index3].timerTime = action.timerTime;
			let newState3 = {
				business: newBusiness3
			}
			return newState3;

		case actionTypes.CLEAR_CURRENT_STOPWATCH_TIME:
			let oldBusiness4 = state.business;
			console.log(action.id)
			let index4 = oldBusiness4.findIndex((el)=>el.id==action.id);
			let newBusiness4 = [...oldBusiness4];
			console.log(newBusiness4[index4])
			newBusiness4[index4].currentStopwatchTime = {
				hours: '00',
				minutes: '00',
				seconds: '00',
				centiseconds: '00'
			}
			newBusiness4[index4].timerTime = 0;
			let newState4 = {
				business: newBusiness4
			}
			return newState4;

		case actionTypes.SAVE_TIMER_TIME:
			let oldBusiness5 = state.business;
			let index5 = oldBusiness5.findIndex((el)=>el.id==action.id);
			let newBusiness5 = [...state.business];
			newBusiness5[index5].currentCountdownTime = action.currentCountdownTime;
    		newBusiness5[index5].timerTimeCountDown = action.timerTimeCountDown;

    		newBusiness5[index5].currentMiniStopwatchTime = action.currentMiniStopwatchTime;
    		newBusiness5[index5].miniTimerTime = action.miniTimerTime;

			let newState5 = {
				business: newBusiness5
			}

			return newState5;

			case actionTypes.CLEAR_CURRENT_COUNTDOWN_TIME:
			let oldBusiness6 = state.business;
			let index6 = oldBusiness6.findIndex((el)=>el.id==action.id);
			let newBusiness6 = [...oldBusiness6];
			newBusiness6[index6].currentCountdownTime = {
				hours: '00',
				minutes: '00',
				seconds: '00'
			}
			newBusiness6[index6].timerTimeCountDown = 0;
			let newState6 = {
				business: newBusiness6
			}
			return newState6;

		case actionTypes.STOPWATCH_OR_COUNTDOWN_IS_SHOWN_HANDLER:

		let newBusiness7 = [...state.business];
		let index7 = newBusiness7.findIndex((el)=>el.id==action.id);
		if(action.countDownOrStopwatch=='stopWatch'){
			newBusiness7[index7].stopWatchIsShown = true;
			newBusiness7[index7].countDownIsShown = false;
		}
		else if(action.countDownOrStopwatch=='countDown'){
			newBusiness7[index7].stopWatchIsShown = false;
			newBusiness7[index7].countDownIsShown = true;
		}
		let newState7 = {
			business: newBusiness7
		}
		return newState7;

		case actionTypes.DELETE_BUSINESS:
			let newBusiness8 = [...state.business];
			let index8 = newBusiness8.findIndex((el)=>el.id==action.id);
			newBusiness8.splice(index8, 1);
			
			let newState8 = {
				business: newBusiness8
			} 
			return newState8;

		case actionTypes.ADD_WORKING_HOURS:
			let newBusiness9 = [...state.business];
			let index9 = newBusiness9.findIndex((el)=>el.id==action.id);
			let currentTotalHours = newBusiness9[index9].totalHours;  
			let currentStopWatchTime = newBusiness9[index9].currentStopwatchTime;
			let currentMiniStopwatchTime = newBusiness9[index9].currentMiniStopwatchTime;
			let currentCountdownTime = newBusiness9[index9].currentCountdownTime;;

			if(newBusiness9[index9].timerOn && newBusiness9[index9].timerTime>59999){
				alert('Would you like to stop timer and add your hours?')
			}
			if(newBusiness9[index9].timerOn && newBusiness9[index9].timerTime<60000){
				alert('Work at least 1 minute');
			}

			if(!newBusiness9[index9].timerOn){
				if(newBusiness9[index9].stopWatchIsShown){
					if(newBusiness9[index9].timerTime<60000){
						alert('Work at least 1 minute!');
						return state;
					}
					newBusiness9[index9].totalHours.hours = parseInt(currentTotalHours.hours, 10) + parseInt(currentStopWatchTime.hours, 10);
					newBusiness9[index9].totalHours.minutes = parseInt(currentTotalHours.minutes, 10) + parseInt(currentStopWatchTime.minutes, 10);
					if(newBusiness9[index9].totalHours.minutes>59){
						let restMinutes = newBusiness9[index9].totalHours.minutes - 60;
						newBusiness9[index9].totalHours.minutes=restMinutes;
						newBusiness9[index9].totalHours.hours +=1;
					}			
				}
			}

			// else if(newBusiness9[index9].countDownIsShown){
				
			// 	if(newBusiness9[index9].countDownIsShown){
			// 	newBusiness9[index9].totalHours.hours = parseInt(currentTotalHours.hours, 10) + parseInt(currentMiniStopwatchTime.hours, 10);
			// 	newBusiness9[index9].totalHours.minutes = parseInt(currentTotalHours.minutes, 10) + parseInt(currentMiniStopwatchTime.minutes, 10);
				
			// 	if(newBusiness9[index9].totalHours.minutes>59){
			// 		let restMinutes = newBusiness9[index9].totalHours.minutes - 60;
			// 		newBusiness9[index9].totalHours.minutes=restMinutes;
			// 		newBusiness9[index9].totalHours.hours +=1;
			// 	}			
			// 	}
			// }

				currentStopWatchTime.hours = '00';
				currentStopWatchTime.minutes = '00';
				currentStopWatchTime.seconds = '00';
				currentStopWatchTime.centiseconds = '00';
				
				currentCountdownTime.hours = '00';
				currentCountdownTime.minutes = '00';
				currentCountdownTime.seconds = '00';

				currentMiniStopwatchTime.hours = '00';
				currentMiniStopwatchTime.minutes = '00';
				currentMiniStopwatchTime.seconds = '00';

				newBusiness9[index9].timerTime = 0;
				newBusiness9[index9].timerTimeCountDown = 0;
				newBusiness9[index9].miniTimerTime = 0;


				// clear both timers:

			let newState9 = {
				business: newBusiness9
			} 
		return newState9	

		case actionTypes.INCREASE_TIMER:

      		let oldBusiness10 = state.business;
      		let index10 = oldBusiness10.findIndex((el)=>el.id==action.id);
      		let newBusiness10 = [...state.business];
        	newBusiness10[index10].timerTimeCountDown = newBusiness10[index10].timerTimeCountDown + action.increaseBy;
			let newState10 = {
				business: newBusiness10
			}
			return newState10;

		case actionTypes.UPDATE_STOPWATCH:
      		let newBusiness11 = [...state.business];
      		let index11 = newBusiness11.findIndex((el)=>el.id==action.id);
  			let stopWatchData = action.stopWatchData;

  			if(stopWatchData.timerOn!==undefined){
      			newBusiness11[index11].timerOn = stopWatchData.timerOn;
      		}
      		if(stopWatchData.timerStart!==undefined){
      			newBusiness11[index11].timerStart = stopWatchData.timerStart;
      		}
      		if(stopWatchData.timerTime!==undefined){
      			newBusiness11[index11].timerTime = stopWatchData.timerTime;
      		}

  			let centiseconds = ("0" + (Math.floor(newBusiness11[index11].timerTime / 10)% 100)).slice(-2);
  			let seconds = ("0" + (Math.floor(newBusiness11[index11].timerTime / 1000) % 60)).slice(-2);
  			let minutes = ("0" + (Math.floor(newBusiness11[index11].timerTime / 60000) % 60)).slice(-2);
  			let hours = ("0" + Math.floor(newBusiness11[index11].timerTime / 3600000)).slice(-2);
			
  			newBusiness11[index11].currentStopwatchTime.centiseconds = centiseconds;
  			newBusiness11[index11].currentStopwatchTime.seconds = seconds;
  			newBusiness11[index11].currentStopwatchTime.minutes = minutes;
  			newBusiness11[index11].currentStopwatchTime.hours = hours;

			let newState11 = {
				business: newBusiness11
			}
			return newState11;

			case actionTypes.SAVE_TIMER_ID:
			let newBusiness12 = [...state.business];
      		let index12 = newBusiness12.findIndex((el)=>el.id==action.id);

      		newBusiness12[index12].timerId = action.timerId;

			let newState12 = {
				business: newBusiness12
			}

			return newState12;

			case actionTypes.CLEAR_STOPWATCH:
			let newBusiness13 = [...state.business];
      		let index13 = newBusiness13.findIndex((el)=>el.id==action.id);


      		newBusiness13[index13].timerStart = action.timerStart = 0;
      		newBusiness13[index13].timerTime = action.timerTime = 0;

      		newBusiness13[index13].currentStopwatchTime.centiseconds = '00';
      		newBusiness13[index13].currentStopwatchTime.seconds = '00';
      		newBusiness13[index13].currentStopwatchTime.minutes = '00';
      		newBusiness13[index13].currentStopwatchTime.hours = '00';

			let newState13 = {
				business: newBusiness13
			}

			return newState13;

			case 'TEST_REQ':
			console.log('database test');
			console.log(action.data)
			return state;

			// DATA FETCHING

			case actionTypes.FETCH_BUSINESSDATA_BEGIN:
				let newBusiness14 = [...state.business];
      			let index14 = newBusiness14.findIndex((el)=>el.id==action.id);
				alert('YO');
				return newBusiness14

		default:
		return state; 
	}
}

export default reducer;