var Employee = require("../Models/Employee");
exports.dataList = async function(req, res) {
	const {
		iDisplayLength, sEcho
	} = JSON.parse(JSON.stringify(req.body));
	var pageNo = parseInt(sEcho);
	var size = parseInt(iDisplayLength);
	var query = {};
	if(pageNo < 0 || pageNo === 0) {
		response = {
			error: true,
			message: "invalid page number, should start with 1",
		};
		return res.json(response);
	}
	query.skip = size * (pageNo - 1);
	query.limit = size;
	Employee.find({}, {}, query, async(err, data) => {
		if(err) {
			response = {
				error: true,
				message: "Error fetching data"
			};
		} else {
			let skodaJsonDataArr = new Array();
			for(let i = 0; i < data.length; i++) {
				let carObj = new Object();
				if(data[i].locationName != undefined) {
					carObj.locationName = data[i].locationName;
				} else {
					carObj.locationName = "";
				}
				if(data[i].telephone != undefined) {
					carObj.telephone = data[i].telephone;
				} else {
					carObj.telephone = "";
				}
				if(data[i].mapUrl != undefined) {
					carObj.mapUrl = `<a href="${data[i].mapUrl}" target="_blank"> click here </a>`;
				} else {
					carObj.mapUrl = "";
				}
				if(data[i].locality != undefined) {
					carObj.locality = data[i].locality;
				} else {
					carObj.locality = "vf";
				}
				skodaJsonDataArr.push(carObj);
			}
			response = skodaJsonDataArr;
		}
		var Count = Employee.find();
		Count.count(function(err, count) {
			if(err) console.log(err);
			else {
				res.send({
					draw: sEcho,
					recordsTotal: count,
					recordsFiltered: count,
					data: response,
				});
			}
		});
	});
};

exports.list = function(req, res) {
	res.render("../views/index");
};
module.exports = exports;
