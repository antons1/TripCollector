(ns trip-collector.db
  (:require [monger.core :as mg]
            [monger.collection :as mc]
            [trip-collector.config :refer [config]])
  (:import (java.util UUID)))

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
                          {:_id (UUID/randomUUID)}
                          trip)))
(defn trip [id]
  (mc/find-map-by-id @database "trips" (UUID/fromString id)))

(comment
  (trips)
  (empty? (trips))
  (connection!)
  (disconnect!)
  @connection
  (trip "b65e05ac-6ac4-4c21-a904-c6deddc36ae2")
  (insert-trip! { :author "Håkon Antonsen"}))