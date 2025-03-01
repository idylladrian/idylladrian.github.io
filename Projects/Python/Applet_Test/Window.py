from PyQt5.QtWidgets import QApplication, QMainWindow

class MyWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Basic PyQt5 Window")
        self.setGeometry(100, 100, 400, 300)  # x, y, width, height