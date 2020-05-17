function ajaxCall(url, data, success, type, errorCallback) {
	
	if (type === undefined)
		type = 'GET'

	if (data['dataType'] === undefined){
		dataType = 'json'
	}

	var authorization = ""
	var id_token = window.sessionStorage.getItem('id_token')

	if (id_token)
		authorization = id_token
	// set ajax object
	var ajaxObj = {
		url: API_URL[String(cur_ip.replace(' ', ''))] + url,
		type: type,
		data: data,
		dataType: dataType,
		headers: {"Authorization": authorization},
		success: function(response, textStatus, jqXHR) {

			// for debugging
			var requestUrl = ''
			var index = outstandingAjaxCalls.indexOf(jqXHR)
			if (index > -1)
				requestUrl = outstandingRequestUrl[index + 1]

			// check if user is logged in
			if (response && jqXHR.status) {
				console.log(requestUrl + ':', response)
				if (response.error_code) {

					if (response.error_code == 503) {

						// reauthenticate
						logOut(true)
					}

					errorCallback(response)

				} else {

					success(response)
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrow) {
			// console.log('request error:', jqXHR.status)
			if (jqXHR.status == 401 || jqXHR.status == 0) {

				// logout()

			} else {
				if (errorCallback)
					errorCallback()
				console.log('AJAX error')
				console.log("jqXHR: ",jqXHR)
				console.log("textStatus: ",textStatus)
				console.log("errorThrow: ",errorThrow)
			}
		},
		complete: function(jqXHR, textStatus) {
			var index = outstandingAjaxCalls.indexOf(jqXHR)

			// remove call from outstandingAjaxCalls
			if (index > -1) {
				outstandingAjaxCalls.splice(index, 1)

				// for debugging
				outstandingRequestUrl.splice(index, 1)
			}
		}
	}

	// for debugging
	outstandingRequestUrl.push(url)

	// perform ajax call
	var ajaxCall = $.ajax(ajaxObj)

	outstandingAjaxCalls.push(ajaxCall)

	console.log('request', url)

	return ajaxCall
}