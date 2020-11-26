(ns trip-collector.trips
  (:require [trip-collector.domain :refer [conform!]]))

(defn create-trip [raw-trip]
  (conform! :trip-collector.domain/trip raw-trip))

