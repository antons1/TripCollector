(ns trip-collector.db
  (:require [monger.core :as mg]
            [monger.collection :as mc]
            [trip-collector.config :refer [config]]))

(defonce connection (atom nil))
(defonce database (atom nil))

(defn connection! []
  (let [{:keys [conn db]} (mg/connect-via-uri (:db-string (config)))]
    (reset! connection conn)
    (reset! database db)))

(defn disconnect! []
  (mg/disconnect @connection))

(defn trips []
  (mc/find-maps @database "trips"))

(defn insert-trip! [trip]
  (mc/insert-and-return @database "trips"
                        (merge
                          {:_id (java.util.UUID/randomUUID)}
                          trip)))

(comment
  (trips)
  (empty? (trips))
  (connection!)
  (disconnect!)
  @connection
  (insert-trip! { :author "Håkon Antonsen"}))