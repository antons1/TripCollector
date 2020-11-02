(ns trip-collector.config
  (:require [aero.core :as aero]))

(defn profile []
  (keyword (or (System/getenv "TC_ENV") :prod)))

(defn config []
  (aero/read-config (clojure.java.io/resource "config.edn") {:profile (profile)}))

(comment
  (profile)
  (config))