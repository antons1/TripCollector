(ns trip-collector.core
  (:require [ring.adapter.jetty :as j]
            [trip-collector.db :refer [connection! disconnect!]]
            [trip-collector.routes :refer [app]])
  (:gen-class))

(defonce server (atom nil))

(defn start! []
  (reset! server (j/run-jetty #'app {:port 3000 :join? false})))

(defn stop! []
  (.stop @server))

(defn run-app []
  (connection!)
  (start!))

(defn stop-app []
  (disconnect!)
  (stop!))

(defn -main [& args]
  (run-app))

(comment
  (run-app)
  (stop-app)
  @server)