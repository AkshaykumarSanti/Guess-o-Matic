import tkinter as tk
import random

class GuessingGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Guess the Number")
        self.root.geometry("300x250")

        # Game State
        self.n = random.randint(1, 100)
        self.guesses = 0

        # UI Elements
        self.label = tk.Label(root, text="Guess a number between 1-100", font=("Arial", 12))
        self.label.pack(pady=20)

        self.entry = tk.Entry(root, font=("Arial", 14))
        self.entry.pack(pady=5)
        self.entry.bind('<Return>', self.check_guess) # Allow pressing 'Enter' key

        self.button = tk.Button(root, text="Submit", command=self.check_guess, bg="#dddddd")
        self.button.pack(pady=10)

        self.result_label = tk.Label(root, text="", font=("Arial", 10, "bold"))
        self.result_label.pack(pady=10)

    def check_guess(self, event=None):
        try:
            user_input = self.entry.get()
            if not user_input: return
            
            a = int(user_input)
            self.guesses += 1
            
            if a > self.n:
                self.result_label.config(text="Lower Number Please", fg="red")
            elif a < self.n:
                self.result_label.config(text="Higher Number Please", fg="orange")
            else:
                self.result_label.config(text=f"Correct! Found in {self.guesses} attempts.", fg="green")
                self.button.config(state="disabled")
            
            self.entry.delete(0, 'end') # Clear input
            
        except ValueError:
            self.result_label.config(text="Please enter a valid number", fg="red")

# Run the application
if __name__ == "__main__":
    root = tk.Tk()
    app = GuessingGame(root)
    root.mainloop()


