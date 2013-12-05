define(['codacy-poc-app'], function (App) {
    describe("App tests", function () {

        window.log = function () {
        };

        it("should be execute callback on start app", function () {
            var app = new App();

            spyOn(app, 'onStart');

            app.start();

            expect(app.onStart).toHaveBeenCalled();
        });

    });
});