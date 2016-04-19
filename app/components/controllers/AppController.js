/**
 * Created by Knarfux on 18/04/2016.
 */
'use strict';


angular


    .module('app', ['angularFileUpload'])


    .controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        function onLoadFile(event) {
            var self = this;
            var img = new Image();
            self.img = img;
            img.onload = function() {
                onLoadImage.call(self, 0);
            };
            img.src = event.target.result;
        }

        function onLoadImage(index) {
            var width = this.img.width;
            var height = this.img.height;
            this.canvas.getContext('2d').drawImage(this.img, 0, 0, width, height);
        }

        $scope.canvasList = {};

        $scope.restore = function(){
            var canvasList = document.getElementsByTagName("canvas");
            var reader;

            for(var i = 0; i < canvasList.length; i++) {
                var canvas = canvasList[i];
                canvas.getContext('2d').clearRect(0, 0, canvasList[i].width, canvasList[i].height);
                var self = this;

                reader = new FileReader();
                reader.canvas = canvas;
                reader.onload = function(event){
                    onLoadFile.call(this, event);
                };
                reader.readAsDataURL(uploader.queue[i]._file);
            }
        };

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


    }]);

