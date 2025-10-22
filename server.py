from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# Load the model from pickle file
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

def get_letter_grade(prediction):
    if prediction == 4:
        return 'A'
    elif prediction == 3:
        return 'B'
    elif prediction == 2:
        return 'C'
    else:
        return 'D'

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html', result=None)

@app.route('/result', methods=['POST'])
def result():
    if request.method == 'POST':
        # Get values from the form
        age = int(request.form['age'])
        medu = int(request.form['motheredu'])
        fedu = int(request.form['fatheredu'])
        traveltime = float(request.form['travel'])
        studytime = float(request.form['study'])
        freetime = float(request.form['freetime'])
        goout = float(request.form['goout'])
        g1 = int(request.form['g1'])
        g2 = int(request.form['g2'])
        g3 = int(request.form['g3'])
        sex = request.form['sex'] # Get sex

        # Prepare data for model prediction
        input_data = np.array([[age, medu, fedu, traveltime, studytime, freetime, goout, g1, g2, g3]])

        # Predict grade using the model
        prediction = model.predict(input_data)[0]

        # Determine letter grade
        letter_grade = get_letter_grade(prediction)

        # Prepare data to pass to the result template
        student_data = {
            'sex': sex,
            'age': age,
            'motheredu': medu,
            'fatheredu': fedu,
            'travel': traveltime,
            'study': studytime,
            'freetime': freetime,
            'goout': goout,
            'g1': g1,
            'g2': g2,
            'g3': g3
        }

        return render_template('result.html', letter_grade=letter_grade, estimated_grade=prediction, result=student_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
