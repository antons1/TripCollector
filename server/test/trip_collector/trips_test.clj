(ns trip-collector.trips-test
  (:require [clojure.test :refer :all]
            [trip-collector.trips :refer [create-trip]]))

(def acceptable-trip {:title "A Title"
                      :author "An Author"
                      :from "2020-10-10T00:00:00.00Z"
                      :to "2020-10-11T00:00:00.00Z"})

(deftest trip-conformity
  (testing "Trip has all keys"
    (is (thrown-with-msg? clojure.lang.ExceptionInfo #"Data does not conform to spec"
                          (create-trip (dissoc acceptable-trip :title)))))
  (testing "From date is before to date"
    (is (thrown-with-msg? clojure.lang.ExceptionInfo #"Data does not conform to spec"
                          (create-trip (assoc acceptable-trip :to "2020-10-09T00:00:00.00Z")))))
  (testing "Well-formed trip is returned"
    (is (= acceptable-trip (create-trip acceptable-trip)))))
