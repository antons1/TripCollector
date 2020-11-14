(ns trip-collector.domain
  (:require [clojure.spec.alpha :as s])
  (:import (java.time Instant)))

(s/def ::date #(try (Instant/parse %)
                    (catch Exception e false)))

(s/def ::title string?)
(s/def ::author string?)
(s/def ::from ::date)
(s/def ::to ::date)

(defn assert-date-after [a b]
  (try (>= 0 (.compareTo (Instant/parse a) (Instant/parse b)))
       (catch Exception e false)))

(s/def ::trip (s/and
                (s/keys :req-un [::from ::to ::title ::author])
                #(assert-date-after (:from %) (:to %))))

(defn conform! [spec x]
  (let [data (s/conform spec x)
        invalid? (= data ::s/invalid)
        explained (s/explain-data spec x)]
    (if invalid? (throw (ex-info "Data does not conform to spec" {:problem explained})) data)))

(comment
  (s/explain-data ::date "2020-10-02")
  (try (conform! ::trip {:author "Håkon Antonsen"
                         :from   "2020-10-03T00:00:00.00Z"
                         :to     "2020-10-04T00:00:00.00Z"
                         :title  "En Dag Ved Vesletjern"})
       (catch Exception e (ex-data e)))
  (assert-date-after "2020-10-03T00:00:00.00Z" "2020-10-04T00:00:00.00Z")
  (s/gen ::trip))
