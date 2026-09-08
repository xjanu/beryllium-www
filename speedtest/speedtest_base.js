/*
 * Helper functions
 */
function I(id){return document.getElementById(id);}

/*
 * Translator
 */

let userLang = navigator.language || navigator.userLanguage;
let trans = [[]];
//en-US (failover)
trans["start"]=[];trans["start"]["en-US"] = "Start";
trans["start4"]=[];trans["start4"]["en-US"] = "Start on IPv4";
trans["start6"]=[];trans["start6"]["en-US"] = "Start on IPv6";
trans["abort"]=[];trans["abort"]["en-US"] = "Abort";
trans["response"]=[];trans["response"]["en-US"] = "Response";
trans["duration"]=[];trans["duration"]["en-US"] = "Duration";
trans["speed"]=[];trans["speed"]["en-US"] = "Speed";
trans["show_advanced"]=[];trans["show_advanced"]["en-US"] = "Show advanced";
trans["settings"]=[];trans["settings"]["en-US"] = "Settings";
trans["stats"]=[];trans["stats"]["en-US"] = "Stats";
trans["test_length"]=[];trans["test_length"]["en-US"] = "Max test length:";
trans["time"]=[];trans["time"]["en-US"] = "Time";
trans["speed"]=[];trans["speed"]["en-US"] = "Speed";
trans["ip_address"]=[];trans["ip_address"]["en-US"] = "IP Address:";
trans["maximal_download"]=[];trans["maximal_download"]["en-US"] = "Maximal download:";
trans["maximal_upload"]=[];trans["maximal_upload"]["en-US"] = "Maximal upload:";
trans["minimal_download"]=[];trans["minimal_download"]["en-US"] = "Minimal download:";
trans["minimal_upload"]=[];trans["minimal_upload"]["en-US"] = "Minimal upload:";
trans["total_download"]=[];trans["total_download"]["en-US"] = "Total download:";
trans["total_upload"]=[];trans["total_upload"]["en-US"] = "Total upload:";
trans["show_detailed_a"]=[];trans["show_detailed_a"]["en-US"] = "Show";
trans["show_detailed_b"]=[];trans["show_detailed_b"]["en-US"] = "detailed information about used algorithms.";
trans["desc_on_ipv4"]=[];trans["desc_on_ipv4"]["en-US"] = "You are currently connected to the speedtest server via IPv4.";
trans["desc_on_ipv6"]=[];trans["desc_on_ipv6"]["en-US"] = "You are currently connected to the speedtest server via IPv6.";
trans["desc_ping"]=[];trans["desc_ping"]["en-US"] = "Ping is measured as a response time for a HTTP request. Multiple requests are sent in 100 ms intervals. The graph shows response times for individual requests. The time values are preferably obtained from the JavaScript Performance API. If this API is not supported in the user's web browser, the JavaScript Date().getTime() function is used, which however provides less precise values.";
trans["desc_jitter"]=[];trans["desc_jitter"]["en-US"] = "Jitter is computed as a standard deviation of all ping values measured up to the given time. A more representative value is therefore indicated at the end of the measurement.";
trans["desc_down_up"]=[];trans["desc_down_up"]["en-US"] = "Download and upload are measured by transferring blocks of data by HTTP requests. The bandwidth is computed from HTTP payload data transferred (without HTTP and lower layer headers). The graph shows an arithmetic mean of all values measured up to the given time. A more representative value for large file transfers is therefore indicated at the end of the measurement.";
trans["desc_final"]=[];trans["desc_final"]["en-US"] = "The final number indicated in gauges is an average value for all pings and a value at the end of the measurement for the other characteristics.";
trans["desc_origin"]=[];trans["desc_origin"]["en-US"] = "CESNET speedtest is based on opensource LibreSpeed project. Original source code can be obtained at ";
trans["desc_oou"]=[];trans["desc_oou"]["en-US"] = "General Data Protection";
trans["desc_questions"]=[];trans["desc_questions"]["en-US"] = "For any questions regarding speedtest, please contact us on email: melnikov (at) cesnet.cz.";
//cs-CZ
trans["start"]["cs-CZ"] = "Spustit";
trans["start4"]["cs-CZ"] = "Spustit po IPv4";
trans["start6"]["cs-CZ"] = "Spustit po IPv6";
trans["abort"]["cs-CZ"] = "Zrušit";
trans["response"]["cs-CZ"] = "Odezva";
trans["duration"]["cs-CZ"] = "Průběh";
trans["show_advanced"]["cs-CZ"] = "Pokročilé nastavení";
trans["settings"]["cs-CZ"] = "Nastavení";
trans["test_length"]["cs-CZ"] = "Maximální délka testu:";
trans["stats"]["cs-CZ"] = "Statistiky";
trans["time"]["cs-CZ"] = "Čas";
trans["speed"]["cs-CZ"] = "Rychlost";
trans["ip_address"]["cs-CZ"] = "IP Adresa:";
trans["maximal_download"]["cs-CZ"] = "Maximální download:";
trans["maximal_upload"]["cs-CZ"] = "Maximální upload:";
trans["minimal_download"]["cs-CZ"] = "Minimální download:";
trans["minimal_upload"]["cs-CZ"] = "Minimální upload:";
trans["total_download"]["cs-CZ"] = "Celkový download:";
trans["total_upload"]["cs-CZ"] = "Celkový upload:";
trans["show_detailed_a"]["cs-CZ"] = "Zobrazit";
trans["show_detailed_b"]["cs-CZ"] = "detailní informace o použitých algoritmech.";
trans["desc_on_ipv4"]["cs-CZ"] = "Aktuálně přistupujete ke speedtest serveru po IPv4.";
trans["desc_on_ipv6"]["cs-CZ"] = "Aktuálně přistupujete ke speedtest serveru po IPv6.";
trans["desc_ping"]["cs-CZ"] = "Ping je měřen jako čas odezvy na požadavek protokolu HTTP. Je odeslána řada požadavků v intervalu 100 ms. V grafu jsou zobrazeny časy odezvy na jednotlivé požadavky. Časové hodnoty jsou prioritně získávány z Javascript Performance API. Pokud toto rozhraní není ve Vašem webovém prohlížeči podporováno, je použita Javascript funkce Date().getTime(), která ale poskytuje méně přesné hodnoty.";
trans["desc_jitter"]["cs-CZ"] = "Jitter je počítán jako směrodatná odchylka všech naměřených hodnot pingu až do daného času. Reprezentativnější hodnota je tedy zobrazena na konci měření.";
trans["desc_down_up"]["cs-CZ"] = "Download a upload jsou měřeny přenosem bloků dat pomocí protokolu HTTP. Kapacita je počítána z přenesených uživatelských dat (bez hlaviček HTTP a hlaviček nižších vrstev). Graf zobrazuje aritmetický průměr všech hodnot naměřených až do daného času. Reprezentativnější hodnota pro přenosy velkých souborů je tedy zobrazena na konci měření.";
trans["desc_final"]["cs-CZ"] = "Konečné hodnoty uvedené uprostřed grafických indikátorů jsou průměrná hodnota pro všechny pingy a hodnota na konci měření pro ostatní charakteristiky.";
trans["desc_origin"]["cs-CZ"] = "CESNET speedtest je založen na opensource projektu LibreSpeed. Originální zdrojové kódy jsou k dispozici na serveru ";
trans["desc_oou"]["cs-CZ"] = "Informace o zpracování osobních údajů";

function tr(name) {
	if (trans[name][userLang] !== undefined)
		return trans[name][userLang];
	if (trans[name]["en-US"] !== undefined)
		return trans[name]["en-US"];
	return "unknown translation"
}
function trw(name) {
	document.write(tr(name));
}

/*
 * Base settings
 */
let IPv4 = false;
let IPv6 = false;
let curr_btn_id = "startStopBtn";
const base4URL = "https://speedtest4.cesnet.cz";
const base6URL = "https://speedtest6.cesnet.cz";
const check4URL = base4URL+"/backend/empty.php?cors=true";
const check6URL = base6URL+"/backend/empty.php?cors=true";
const def_url_dl = "backend/garbage.php";
const def_url_ul = "backend/empty.php";
const def_url_ping = "backend/empty.php";
const def_url_getIp = "backend/getIP.php";

/*
 * Base settings
 */
let meterBk="#E0E0E0";
let dlColor="#6060AA",
	ulColor="#309030",
	pingColor="#ffcc00",
	jitColor="#cc0000";
let progColor="#EEEEEE";


/*
 * Base variables
 */
let w=null; //speedtest worker
let sampling=false;
let data=[]; //data from worker
let timers=[]; //test timing
let parameters={ //custom test parameters. See doc.md for a complete list
	overheadCompensationFactor: 1.0,
	enable_quirks: true,
	time_ul_max: 15,
	time_dl_max: 15,
	time_ulGraceTime: 3,
	time_dlGraceTime: 1.5,
	count_ping: 35,
	url_dl: def_url_dl,
	url_ul: def_url_ul,
	url_ping: def_url_ping,
	url_getIp: def_url_getIp,
	time_auto: false
};
let chart1; // Global charts
let chart2;
let last_chart_pos;
let max_upload = 0;
let min_upload = 0;
let max_download = 0;
let min_download = 0;
let total_upload = 0;
let total_download = 0;
let ping_sum = 0;
let ping_cnt = 0.001;

/*
 * Gauges code
 */
function drawMeter(c,amount,bk,fg,progress,prog){
	let ctx=c.getContext("2d");
	let dp=window.devicePixelRatio||1;
	let cw=c.clientWidth*dp, ch=c.clientHeight*dp;
	let sizScale=ch*0.0055;
	if(c.width==cw&&c.height==ch){
		ctx.clearRect(0,0,cw,ch);
	}else{
		c.width=cw;
		c.height=ch;
	}
	ctx.beginPath();
	ctx.strokeStyle=bk;
	ctx.lineWidth=16*sizScale;
	ctx.arc(c.width/2,c.height-58*sizScale,c.height/1.8-ctx.lineWidth,-Math.PI*1.1,Math.PI*0.1);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle=fg;
	ctx.lineWidth=16*sizScale;
	ctx.arc(c.width/2,c.height-58*sizScale,c.height/1.8-ctx.lineWidth,-Math.PI*1.1,amount*Math.PI*1.2-Math.PI*1.1);
	ctx.stroke();
	if(typeof progress !== "undefined"){
		ctx.fillStyle=prog;
		ctx.fillRect(c.width*0.3,c.height-16*sizScale,c.width*0.4*progress,4*sizScale);
	}
}
function mbpsToAmount(s){
	return 1-(1/(Math.pow(1.3,Math.sqrt(s))));
}
function msToAmount(s){
	return 1-(1/(Math.pow(1.08,Math.sqrt(s))));
}
function oscillate(){
	return 1+0.02*Math.sin(Date.now()/100);
}


/*
 * UI and charts code
 */
function initUI(){
	drawMeter(I("dl_meter"),0,meterBk,dlColor,0);
	drawMeter(I("ul_meter"),0,meterBk,ulColor,0);
	drawMeter(I("ping_meter"),0,meterBk,pingColor,0);
	drawMeter(I("jitter_meter"),0,meterBk,jitColor,0);
	I("dl_text").textContent="";
	I("ul_text").textContent="";
	I("ping_text").textContent="";
	I("jitter_text").textContent="";
	I("ip").textContent="?";
	
	// Init charts
	let chart1ctx = document.getElementById('chart_du_area').getContext('2d')
	let chart2ctx = document.getElementById('chart_pj_area').getContext('2d')
	let dlDataset = {
		label: 'Download',
		fill: false,
		lineTension: 0.1,
		backgroundColor: 'rgba(96,96,170,0.5)',
		borderColor: 'rgba(96,96,170,1)',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: 'rgba(96,96,170,1)',
		pointBackgroundColor: '#fff',
		pointBorderWidth: 1,
		pointHoverRadius: 0,
		pointHoverBackgroundColor: 'rgba(96,96,170,1)',
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10,
		data: [0],
		spanGaps: false
	}
	let ulDataset = {
		label: 'Upload',
		fill: false,
		lineTension: 0.1,
		backgroundColor: 'rgba(48,144,48,0.5)',
		borderColor: 'rgba(48,144,48,1)',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: 'rgba(48,144,48,1)',
		pointBackgroundColor: '#fff',
		pointBorderWidth: 1,
		pointHoverRadius: 0,
		pointHoverBackgroundColor: 'rgba(48,144,48,1)',
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10,
		data: [0],
		spanGaps: false
	}
	let pingDataset = {
		label: 'Ping',
		fill: false,
		lineTension: 0.1,
		backgroundColor: 'rgba(255,204,0,0.5)',
		borderColor: 'rgba(255,204,0,1)',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: 'rgba(255,204,0,1)',
		pointBackgroundColor: '#fff',
		pointBorderWidth: 1,
		pointHoverRadius: 0,
		pointHoverBackgroundColor: 'rgba(75,220,75,1)',
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10,
		data: [],
		spanGaps: false
	}
	let jitterDataset = {
		label: 'Jitter',
		fill: false,
		lineTension: 0.1,
		backgroundColor: 'rgba(204,0,0,0.5)',
		borderColor: 'rgba(204,0,0,1)',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: 'rgba(204,0,0,1)',
		pointBackgroundColor: '#fff',
		pointBorderWidth: 1,
		pointHoverRadius: 0,
		pointHoverBackgroundColor: 'rgba(220,75,75,1)',
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10,
		data: [],
		spanGaps: false
	}

	let chart1Options = {
		type: 'line',
		data: {
			datasets: [dlDataset, ulDataset]
		},
		options: {
			responsive: true,
			tooltips: {
				enabled: false
			},
			legend: {
				position: 'top'
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: tr('duration') + ' (s)'
					},
					ticks: {
						beginAtZero: true
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: tr('speed') + ' (Mbps)'
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	}
	let chart2Options = {
		type: 'line',
		data: {
			datasets: [pingDataset, jitterDataset]
		},
		options: {
			responsive: true,
			tooltips: {
				enabled: false
			},
			legend: {
				position: 'top'
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: tr('duration') + ' (ms)'
					},
					ticks: {
						beginAtZero: true
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: tr('response') + ' (ms)'
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	}
	
	if (chart1 !== undefined) chart1.destroy();
	if (chart2 !== undefined) chart2.destroy();

	chart1 = new Chart(chart1ctx, chart1Options)
    chart2 = new Chart(chart2ctx, chart2Options)
    
    $('#results_table_download').html("<tr><th>"+tr("time")+" (s)</th><th>"+tr("speed")+" (Mbps)</th></tr>");
    $('#results_table_upload').html("<tr><th>"+tr("time")+" (s)</th><th>"+tr("speed")+" (Mbps)</th></tr>");
    $('#stats_table').html("");
    max_download = 0;
    min_download = 0;
    max_upload = 0;
    min_upload = 0;
    total_download = 0;
    total_upload = 0;
    $("#length").val(parameters.time_dl_max);
}

function checkURL(url, successCallback) {
	$.ajax({
		url: url,
		method: 'GET',
		timeout: 2000,
		cache: false,
		xhrFields: { withCredentials: false },
		crossDomain: true
	})
	.done(function() {
		successCallback();
	})
	.fail(function() {
		// Does not mean anything, just no connectivity over IPv4 or IPv6
		console.log("No connectivity to " + url);
	});
}

function changeStartStopBtns() {
	if (IPv4 && IPv6) {
		$("#startStopBtn").addClass("hidden");
		$("#startStop4Btn").removeClass("hidden");
		$("#startStop6Btn").removeClass("hidden");
	}
}

$(document).ready(function() {
    $("#show_advanced").click(function() {
        $("#advanced").slideToggle(300);
	});
	$("#show_speedtest_info").click(function() {
        $("#speedtest_info").slideToggle(300);
    });
	// Check connectivity
	checkURL(check4URL, function() {
        IPv4 = true;
		changeStartStopBtns();
	});
	checkURL(check6URL, function() {
		IPv6 = true;
		changeStartStopBtns();
	});
});

/*
 * Update UI code
 */
function updateUI(forced){
	if(!forced&&(!data||!w)) return;
	let status=Number(data[0]);
	I("ip").textContent=data[4];
	I("dl_text").textContent=(status==1&&data[1]==0)?"...":data[1];
	drawMeter(I("dl_meter"),mbpsToAmount(Number(data[1]*(status==1?oscillate():1))),meterBk,dlColor,Number(data[6]),progColor);
	I("ul_text").textContent=(status==3&&data[2]==0)?"...":data[2];
	drawMeter(I("ul_meter"),mbpsToAmount(Number(data[2]*(status==3?oscillate():1))),meterBk,ulColor,Number(data[7]),progColor);
	if (status === 2 && Number(data[3]) > 0) {
		ping_sum += Number(data[3]);
		ping_cnt++;
	}
	I("ping_text").textContent=(ping_sum / ping_cnt).toFixed(2);
	drawMeter(I("ping_meter"),msToAmount(Number((ping_sum/ping_cnt)*(status==2?oscillate():1))),meterBk,pingColor,Number(data[8]),progColor);
	I("jitter_text").textContent=data[5];
	drawMeter(I("jitter_meter"),msToAmount(Number(data[5]*(status==2?oscillate():1))),meterBk,jitColor,Number(data[8]),progColor);
	if (status === 1 && Number(data[1]) > 0) {
        // Chart update
        let chart_pos = ~~(parameters.time_dl_max*Number(data[6]));
		chart1.data.datasets[0].data[chart_pos]=(Number(data[1]));
		chart1.data.labels[chart1.data.datasets[0].data.length - 1] = chart_pos;
        chart1.update();
        // Table update
        if (last_chart_pos != chart_pos && chart_pos != 0) {
            $('#results_table_download').append("<tr><td>"+chart_pos+"</td><td>"+Number(data[1])+"</td></tr>");
            if (Number(data[1]) > max_download || max_download <= 0) max_download = Number(data[1]);
            if (Number(data[1]) < min_download || min_download <= 0) min_download = Number(data[1]);
            total_download = data[9];
            updateStats();
            last_chart_pos = chart_pos;
        }
        
	}
	if (status === 3 && Number(data[2]) > 0) {
        // Chart update
        let chart_pos = ~~(parameters.time_ul_max*Number(data[7]));
		chart1.data.datasets[1].data[chart_pos]=(Number(data[2]));
		chart1.data.labels[chart1.data.datasets[1].data.length - 1] = chart_pos;
        chart1.update();
        // Table update
        if (last_chart_pos != chart_pos && chart_pos != 0) {
            $('#results_table_upload').append("<tr><td>"+chart_pos+"</td><td>"+Number(data[2])+"</td></tr>");
            last_chart_pos = chart_pos;
            if (Number(data[2]) > max_upload || max_upload <= 0) max_upload = Number(data[2]);
            if (Number(data[2]) < min_upload || min_upload <= 0) min_upload = Number(data[2]);
            total_upload = data[10];
            updateStats();
        }
	}
	if (status === 2 && Number(data[3]) > 0 && Number(data[8]) < 1) {
		chart2.data.datasets[0].data.push(Number(data[3]));
		chart2.data.datasets[1].data.push(Number(data[5]));
		chart2.data.labels[chart2.data.datasets[0].data.length - 1] = '';
		chart2.data.labels[chart2.data.datasets[1].data.length - 1] = Math.round(data[11]/100)*100;
		chart2.update();
	}
}
function updateStats() {
    $('#stats_table').html("\
        <tr><th>"+tr("minimal_download")+"</th><td>"+min_download+" Mbps</td></tr>\
        <tr><th>"+tr("maximal_download")+"</th><td>"+max_download+" Mbps</td></tr>\
        <tr><th>"+tr("minimal_upload")+"</th><td>"+min_upload+" Mbps</td></tr>\
        <tr><th>"+tr("maximal_upload")+"</th><td>"+max_upload+" Mbps</td></tr>\
        <tr><th>"+tr("total_download")+"</th><td>"+Math.round(total_download/1024/1024)+" MB</td></tr>\
        <tr><th>"+tr("total_upload")+"</th><td>"+Math.round(total_upload/1024/1024)+" MB</td></tr>\
        ");
}

/*
 * Speedtest code
 */
function start4Stop() {
	parameters.url_dl = base4URL + "/" + def_url_dl;
    parameters.url_ul = base4URL + "/" + def_url_ul;
    parameters.url_ping = base4URL + "/" + def_url_ping;
    parameters.url_getIp = base4URL + "/" + def_url_getIp;
    parameters.mpot = true;
    curr_btn_id = "startStop4Btn";
    startStop();
}

function start6Stop() {
	parameters.url_dl = base6URL + "/" + def_url_dl;
    parameters.url_ul = base6URL + "/" + def_url_ul;
    parameters.url_ping = base6URL + "/" + def_url_ping;
    parameters.url_getIp = base6URL + "/" + def_url_getIp;
    parameters.mpot = true;
    curr_btn_id = "startStop6Btn";
    startStop();
}
function startStop() {
	if(w != null) {
		//speedtest is running, abort
		w.postMessage('abort');
		resetUI();
		initUI();
	} else {
        //update params
        let min = parseInt($("#length").attr('min'));
        let max = parseInt($("#length").attr('max'));
		let val = parseInt($("#length").val());
		if (val < min) val = min;
		if (val > max) val = max;
        parameters.time_dl_max = val;
        parameters.time_ul_max = val;
		initUI();
		//test is not running, begin
		w = new Worker("speedtest_worker.js?r=" + Math.random());
		w.postMessage('start '+JSON.stringify(parameters)); //run the test with custom parameters
		if (IPv4 && IPv6) {
			I("startStop4Btn").className="btn disabled";
			I("startStop6Btn").className="btn disabled";
		} else {
			I("startStopBtn").className="btn disabled";
		}
		I(curr_btn_id).innerHTML = tr("abort");
		setTimeout(function() { I(curr_btn_id).className="btn running"; }, 1500);
		w.onmessage=function(e) {
			let resData = JSON.parse(e.data);
			// testStatus, dlStatus, ulStatus, pingStatus, clientIp, jitterStatus, dlProgress, ulProgress, pingProgress, dlAmount, ulAmount;
			data[0] = resData.testState;
			data[1] = resData.dlStatus;
			data[2] = resData.ulStatus;
			data[3] = resData.pingStatus;
			data[4] = resData.clientIp;
			data[5] = resData.jitterStatus;
			data[6] = resData.dlProgress;
			data[7] = resData.ulProgress;
			data[8] = resData.pingProgress;
			data[9] = resData.dlAmount;
			data[10] = resData.ulAmount;
			let status = resData.testState;
			if (timers[1] == undefined && status == 1)
				timers[1] = performance.now();
			if (timers[2] == undefined && status == 2)
				timers[2] = performance.now();
			if (timers[3] == undefined && status == 3)
				timers[3] = performance.now();
			if (status >= 4) {
				//test completed
				resetUI();
                updateUI(true);
			} else {
				data[11] = performance.now()-timers[status];
				updateUI();
			}
			setTimeout(function() { if (w != null) w.postMessage('status'); }, 50);
		};
		w.postMessage('status');
	}
}
function resetUI() {
	if (IPv4 && IPv6) {
		I("startStop4Btn").className="btn";
		I("startStop6Btn").className="btn";
	} else {
		I("startStopBtn").className="btn";
	}
	if (curr_btn_id == "startStopBtn")
		I(curr_btn_id).innerHTML = tr("start");
	else if (curr_btn_id == "startStop4Btn")
		I(curr_btn_id).innerHTML = tr("start4");
	else
		I(curr_btn_id).innerHTML = tr("start6");
	w=null;
	sampling=false;
	delete timers[1];
	delete timers[2];
    delete timers[3];
}

/*
 * Refresh UI if tab becomes active
 */
window.addEventListener("focus", function(event) { 
    if (!data) data = ["0", "", "", "", "", "", "0", "0", "0", 0];
    updateUI(true)
    chart1.update();
    chart2.update();
}, false);
