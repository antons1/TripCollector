(ns trip-collector.db
  (:require [monger.core :as mg]
            [monger.collection :as mc]))

(defonce connection (atom nil))
(defonce database (atom nil))

(defn connection! []
  (let [{:keys [conn db]} (mg/connect-via-uri "mongodb://trip-collector.db:27017/local")]
    (reset! connection conn)
    (reset! database db)))

(defn disconnect! []
  (mg/disconnect @connection))

(defn articles []
  (mc/find-maps @database "documents"))

(comment
  (articles)
  (get-database!)
  @connection)