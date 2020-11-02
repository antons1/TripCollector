(ns trip-collector.routes
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [ring.util.response :refer [response content-type]]
            [jumblerg.middleware.cors :refer [wrap-cors]]
            [trip-collector.db :refer [articles]]))

(defn api-response [body]
  (-> body
      (response)
      (content-type "application/json")))

(defroutes app-routes
           (context "/api" []
             (GET "/articles" [] (-> (articles) first (dissoc :_id) (api-response))))
           (route/not-found "Not Found"))

(def app
  (-> app-routes
      (wrap-json-response)
      (wrap-json-body {:keywords? true})
      (wrap-cors #".*")
      (wrap-defaults site-defaults)))