(require '[clojure.string :as str])

(defn get-lines [file]
  (str/split-lines (slurp file)))

(def lines (get-lines "input.txt"))

(def numbers (map read-string lines))


;; cant reduce infinite sequence
;;(defn accumulate [xs x] (conj xs (+ (last xs) x)))
;;(def values (reduce accumulate [0] (cycle numbers)))

(def values (reductions + 0 (cycle numbers)))

(println "" (frequencies (take 2000 values)))
;;(def value_after_one_period (last values))

