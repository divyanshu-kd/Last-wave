from lazypredict.Supervised import LazyRegressor
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

X = np.array([[171, 240], [305, 435], [29, 561], [59, 843], [184, 900], [14, 432],
     [18, 525], [11, 618], [257, 690], [440, 990], [198, 210], [219, 330]])
y = np.array([-6.75, -6.75, -2.25, -2.25, -2.25, -
     2.25, -0.25, -0.25, -3.75, -4, -6.75, -6.25])
# data = load_breast_cancer()
# X = data.data
# y=data.target



X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

clf = LazyRegressor(verbose=0, ignore_warnings=True, custom_metric=None)
models, predictions = clf.fit(X_train, X_test, y_train, y_test)

print(models)