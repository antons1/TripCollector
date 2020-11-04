(ns trip-collector.routes
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [ring.util.response :as ring-response :refer [response content-type]]
            [jumblerg.middleware.cors :refer [wrap-cors]]
            [trip-collector.db :refer [trips insert-trip!]]
            [trip-collector.trips :refer [create-trip]])
  (:import (clojure.lang ExceptionInfo)))

(defn api-response
  ([body]
   (api-response body 200))
  ([body status]
   (-> body
       (response)
       (content-type "application/json")
       (ring-response/status status))))

(defroutes app-routes
           (context "/api" []
             (GET "/trips" [] (->> (trips) (api-response)))
             (POST "/trips/create" {json :body}
               (try
                 (as-> json $
                     (create-trip $)
                     (insert-trip! $)
                     (api-response $))
                 (catch ExceptionInfo e (if (:problem (ex-data e)) (api-response (ex-data e) 400) (throw e))))))
           (route/not-found "Not Found"))

(def app
  (-> app-routes
      (wrap-json-response)
      (wrap-json-body {:keywords? true})
      (wrap-cors #".*")
      (wrap-defaults api-defaults)))

(comment
  (->> (trips) (map #(dissoc % :_id))))