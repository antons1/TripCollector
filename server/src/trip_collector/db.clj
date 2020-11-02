(ns trip-collector.db
  (:require [monger.core :as mg]
            [monger.collection :as mc]
            [trip-collector.config :refer [config]]))

(defonce connection (atom nil))
(defonce database (atom nil))

(defn articles []
  (mc/find-maps @database "documents"))

(defn assert-data! [call]
  (if (empty? (call))
    (mc/insert @database "documents" {:title "En Dag ved Vesletjern" :author "Håkon Antonsen"}))
  call)

(defn connection! []
  (let [{:keys [conn db]} (mg/connect-via-uri (:db-string (config)))]
    (reset! connection conn)
    (reset! database db)
    (assert-data! articles)))

(defn disconnect! []
  (mg/disconnect @connection))

(comment
  (articles)
  (assert-data! articles)
  (empty? (articles))
  (connection!)
  (disconnect!)
  @connection)