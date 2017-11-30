
module.exports = function(_status,_data,_msg){
	return {
		status:_status == undefined?true:_status,
		data:_data || [],
		msg:_msg || ''
	}
}