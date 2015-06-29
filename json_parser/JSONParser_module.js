angular.module('app',[])
	
	.factory('json', function() {
		//Load the JSON
		var text_json = loadJSON(function(){},"kpca_learn3.json"); //JSON path is specified here
		var json = JSON.parse(text_json); //Parse the JSON text
		console.log(json); //Testing to make sure JSON was loaded correctly
		
		//Process the JSON by filling in options for int and float parameter types
		//Process the JSON by adding an input field to each parameter. Useful for resets.
		for (alg in json) {
			for (type in json[alg].Parameters) {
				var string = "";
				param = json[alg].Parameters[type];
				if (param.Lower_Bound != null) {
					string = param.Lower_Bound.toString() + " < ";
				}				
				if (param.Data_Type == "float") {
					string = string + "Float";
				}
				else if (param.Data_Type == "int") {
					string = string + "Int";
				}
				if (param.Upper_Bound != null) {
					string = string + " < " + param.Upper_Bound.toString();
				}
				if (string != "") { //We don't want to replace options for string data types
					json[alg].Parameters[type].Options = string;
				}
				json[alg].Parameters[type].Input = param.Default;
			}
		}
		
		//Loads JSON as a string from local .json file.
		function loadJSON(callback,filePath) {   
			var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			xobj.open('GET', filePath, false);
			xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == "200") {
					// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
					callback(xobj.responseText);
				}
			};
			xobj.send(null); 
			return xobj.responseText;
		}
		
		return json;
	})
	
	.controller('FormController', ['$scope','json',function($scope,json) {
		//Collect the names of the algorithms to present to user
		//Collect the names of the parameters for each algorithm
		//Collect the description of each algorithm
		var algNames = [];
		var paramNames = {};
		var algDescriptions = {};
		for (algType in json) {
			algNames.push(algType);
			algDescriptions[algType] = json[algType].Description;
			var paramSet = [];
			for (paramType in json[algType].Parameters) {
				paramSet.push(paramType);
			}
			paramNames[algType] = paramSet;
		}
		$scope.algChoices = algNames; //The different algorithms to choose from
		$scope.algChoice = null; //The name of the algorithm that is chosen
		$scope.algDescriptions = algDescriptions; //The algorithm descriptions to display to user
		
		//Determine whether or not parts of HTML are displayed
		$scope.algSelected = false;
		$scope.successShow = false; 
		$scope.failureShow = false;
		
		//Function is called every time a different algorithm is chosen
		$scope.$watch('algChoice', function() {
			
			//Only run when algChoice is not equal to null since 
			//$scope.$watch activates once on program initialization
			if ($scope.algChoice != null) {
				$scope.alg = json[$scope.algChoice]; //Access the algorithm
				$scope.params = $scope.alg.Parameters; //Access the algorithm parameters
				$scope.param_types = paramNames[$scope.algChoice]; //Access the parameter type names
				$scope.algSelected = true; //Display the rest of the HTML
		
				//Error Highlighting Specific to Parameter
				$scope.paramError = function(type) {
					var valid = $scope.paramCheck($scope.params[type]);
					$scope.params[type].error = !valid;
				}
				
				//Error Checking for Submission
				$scope.checkIfValid = function() {
					var flag = true;;
					for (type in $scope.params) {
						if ($scope.params[type].error == true) flag = false;
					}
					return flag;
				}
				
				//Resets Inputs to Default Values in Current Form
				$scope.restoreDefaults = function() {
					for (type in $scope.params) {
						$scope.params[type].Input = $scope.params[type].Default;
						$scope.params[type].error = false;				
					}
				}
				
				//Creates a JSON with Chosen Algorithm and Associated Parameters
				$scope.Submit = function() {
					var output = {};
					if ($scope.checkIfValid()) {
						output.algorithm = $scope.algChoice;
						output.parameters = {};
						for (types in $scope.params) {
							output.parameters[types] = $scope.params[types].Input;
						}
						console.log(output); //TODO: Replace this with an actual file output
						
						//Success Notification
						$scope.successShow = true;
						$scope.failureShow = false;
					}
					else {
						//Error Notification
						$scope.failureShow = true;
						$scope.successShow = false;
					}
				}
		
				//Function returns boolean to indicate whether or not input value is still valid
				$scope.paramCheck = function(param) {
					if (param.Data_Type == "float" || param.Data_Type == "int") {
						if (isNaN(param.Input)) return false; //Check if a number was entered
						if (param.Upper_Bound || param.Upper_Bound==0) { //If upper bound exists, check against it
							if (param.Input > param.Upper_Bound) return false;
						}
						if (param.Lower_Bound || param.Lower_Bound==0) { //If lower bound exists, check against it
							if (param.Input < param.Lower_Bound) return false;
						}
						if (param.Data_Type = "int") { //Check if a float was entered instead of int
							if (param.Input % 1 !== 0) return false;
						}
						return true;
					}
					else if (param.Data_Type == "str") {
						if (param.Options.indexOf(param.Input) < 0) return false;
						return true;
					}
				}
			}
		})
	}])
			 
		