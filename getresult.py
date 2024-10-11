from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

def eye_predict(size,calunit):
     X = [[171, 240], [305, 435], [29, 561], [59, 843], [184, 900], 
          [18, 525], [11, 618], [257, 690], [440, 990], [198, 210], [219, 330], [14, 432],[12, 354]]
     y = [ -6.75, -6.75, -2.25, -2.25, -2.25, -2.25,  -0.25, -3.75, -4, -6.75, -6.25, -0.25,-2.25]
     poly_model = PolynomialFeatures(degree=3)

     # transform out polynomial features
     poly_x_values = poly_model.fit_transform(X)

     # print(poly_model.powers_)

     regression_model = LinearRegression()
     regression_model.fit(poly_x_values, y)
     poly_values_test = poly_model.transform([[size,calunit]])

     # print(poly_values_test)

     # model = ExtraTreesRegressor(n_estimators=100).fit(X, y)
     y_pred = regression_model.predict(poly_values_test)
     return y_pred

# def calculate(x):
#     return -1.56911094e-01 * x + -9.85850852e-04 *x*x

# print((regression_model.coef_))
# print((poly_values_test))
# print(y_pred)
# print()
# print(calculate(poly_values_test))