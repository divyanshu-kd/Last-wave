from scipy import stats
from sklearn import linear_model
import matplotlib.pyplot as plt
import numpy
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.ensemble import ExtraTreesRegressor
from sklearn.ensemble import AdaBoostRegressor

X = [[171, 240], [305, 435], [29, 561], [59, 843], [184, 900], 
     [18, 525], [11, 618], [257, 690], [440, 990], [198, 210], [219, 330], [14, 432]]
y = [ -6.75, -6.75, -2.25, -2.25, -2.25, -2.25,  -0.25, -3.75, -4, -6.75, -6.25, -0.25]

poly_model = PolynomialFeatures(degree=3)

# transform out polynomial features
poly_x_values = poly_model.fit_transform(X)

regression_model = LinearRegression()
regression_model.fit(poly_x_values, y)
poly_values_test = poly_model.transform([[14, 432]])

# model = ExtraTreesRegressor(n_estimators=100).fit(X, y)
y_pred = regression_model.predict(poly_values_test)

print(y_pred)