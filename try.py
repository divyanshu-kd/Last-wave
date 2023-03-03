from scipy import stats
from sklearn import linear_model
import matplotlib.pyplot as plt
import numpy

# points = [9,60,265,420,470]
# maxFreqList = [0.25,2.25,3.75,6.25,6.75]
# slope,intercept, r, p, std_err = stats.linregress(points,maxFreqList)

# def myfunc(x):
#   return slope * x + intercept

# mymodel = list(map(myfunc,points))
# mymodel = numpy.poly1d(numpy.polyfit(points, maxFreqList, 1))
# print(mymodel)/

X = [[171,240],[305,435],[29,561],[59,843],[184,900],[14,432]]
y = [-6.75,-6.75,-2.25,-2.25,-2.25,-2.25]
regr = linear_model.LinearRegression()
regr.fit(X, y)

# predSarvesh = regr.predict([])
print(regr.coef_)
# predLakshay = regr.predict([])
predLakshay = regr.predict([[171,240]])

print("Lakshay = ",predLakshay)

# plt.scatter(points,maxFreqList)
# plt.plot(points,mymodel)
# plt.title("Linear regression model for dominant frequency")
# plt.xlabel("Relative order")
# plt.ylabel("maxFreq")
# plt.show()

# print("The equation for dominant frequency is:  frequency = ",slope,"* RelativeOrder + ",intercept)