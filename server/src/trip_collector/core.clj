(ns trip-collector.core
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.adapter.jetty :as j]
            [jumblerg.middleware.cors :refer [wrap-cors]])
  (:gen-class))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (route/not-found "Not Found"))

(def app
  (-> app-routes
    (wrap-cors #".*")
    (wrap-defaults site-defaults)))

(defn run-app []
  (j/run-jetty #'app { :port 3000 :join? false}))

(defn stop-app [server]
  (.stop server))

(defn -main [& args]
  (run-app))

(comment
  (def server (run-app))
  (stop-app server))