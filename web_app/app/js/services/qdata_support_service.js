/**
 * Created by sotiris on 17/12/2013.
 */
app.service('dataSupportService',[  function() {
    'use strict';

    var inputTypes = ['text','number','url','tel','range','date','color','checkbox','email','week','time','month','file'];

    /**
     *
     * @returns {Array}
     */
    this.getFieldTypes= function (){

        return inputTypes;

    };

    /**
     * @description create text element
     * @param fld_name
     * @returns {String}
     */
    this.createTypeText= function (fld_name){

        var model_name = getName('text',fld_name);
        var friendly_name = getFriendlyName(model_name);

        var result = getTemplateText('text',model_name,friendly_name);
        return result;

    };

    /**
     *
     * @param fld_type
     * @param model_name
     * @param friendly_name
     * @returns {string}
     */
    function getInputTemplate(fld_type,model_name){
        var result = "error type";
        var friendly_name = getFriendlyName(model_name);

         switch (fld_type){
            case 'text':
                result = getTemplateText(fld_type, model_name, friendly_name);
                break;
            case 'number':
                result = getTemplateText(fld_type, model_name, friendly_name);
                break;
            case 'checkbox':
                result = getTemplatecCheckbox(fld_type, model_name, friendly_name);
                break;
            default :
                result = getTemplateText(fld_type, model_name, friendly_name);
        }
        return result;

    }

    /**
     *
     * @param model
     * @returns {string}
     */
    this.createImputForm= function (model){
        var result="";


        angular.forEach(model, function(value, key){

            if(key!=='id'){
                if (key.charAt(0)!=='$')  {
            result= result+ getInputTemplate(getFieldType(key),key);
                }
            }
        });

                return result;

    };

    function getListView(fld_type,model_name){

        var friendly_name = getFriendlyName(model_name);
        var result='<dt>'+friendly_name+'</dt> <dd> {{data_item.'+model_name+'}} </dd>' ;
       return result;

    }

    this.createListview= function (model){
            var result="";

            result='<li class="col-md-3  thumbnail list-unstyled" ng-repeat="data_item in model"> id:{{ data_item.id }} <dl class="dl-horizontal">';
            angular.forEach(model, function(value, key){

                if(key!=='id'){
                    if (key.charAt(0)!=='$')  {
                        result= result+ getListView(getFieldType(key),key);
                    }
                }
            });

            result = result+ '<div class=""><button ng-click="save(data_item)" class="btn btn-primary col-md-3 col-md-offset-1" type="button">Save</button>'+
                '<button ng-click="edit(data_item)" class="btn btn-info col-md-3 col-md-offset-1" type="button">edit</button>'+
            '<button ng-click="delete(data_item)" class="btn btn-danger col-md-3 col-md-offset-1" type="button">Delete</button></div></li>';
            return result;

        };



    /**
     * @description create input type
     * @param fld_type
     * @param fld_name
     * @returns {String}
     */
    this.createImputType= function (fld_type,fld_name){
           var model_name = getName(fld_type, fld_name);
           return getInputTemplate(fld_type,model_name);

    };



    function getTemplateText(type,fld_name,label){
       var temp = '<div class="form-group">' +
        '<label for="'+fld_name+'" class="col-sm-2 control-label">'+label+'</label>' +
            '<div class="col-sm-8">' +
            '<input type="'+type+'" class="form-control"  name="'+fld_name+'" ng-model="model.'+fld_name+'" placeholder="'+label+'">' +
            '</div>' +
           '<div class="col-sm-2">' +
           '{{ model.'+fld_name+' }}'+
           '</div>' +
        '</div>';

        return temp;
    }

    function getTemplatecCheckbox(type,fld_name,label){
        var temp = '<div class="form-group">' +
            '<div class="col-sm-offset-2 col-sm-10">' +
            '<div class="checkbox">' +
            '<label>' +
            '<input type="checkbox" ng-model="model.'+fld_name+'" >' + label+
            '  {{ model.'+fld_name+' }}</label>' +
            '</div></div></div>';
        return temp;
    }

    function getFieldType(fld_name){
         var field = fld_name.split('_')[0];
        return field;
        }

    /**
     * @description get the model name database by type
     * @param fld_type default text
     * @param fld_name default random
     * @returns {string}
     */
    function getName(fld_type,fld_name){
         fld_type = fld_type || 'text';
         fld_name = fld_name || makeidName();
        var field_name = fld_type+'_'+ fld_name.split(' ').join('_');
        field_name = angular.lowercase(field_name);
        return field_name;
    }


    /**
     * @description get the name to show in form
     * @param fld_name
     * @returns {*|String|string}
     */
    function getFriendlyName(fld_name){
        var field_name = fld_name.split('_');
        field_name.shift();
        field_name = ucFirstAllWords(field_name);
        return field_name;
    }

    /**
     * @description create string 8 chars
     * @returns {string}
     */
    function makeidName()
    {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for( var i=0; i < 8; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }


     /**
     * @description Capitalize the first letter of all words in a string:
     * @param array
     * @returns {String}
     */
    function ucFirstAllWords( pieces )
    {

        for ( var i = 0; i < pieces.length; i++ )
        {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    }


}]);