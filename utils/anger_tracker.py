class AngerTracker:
    def __init__(self):
        self.missed = 0
        self.level = 0

    def miss(self):
        self.missed += 1
        self.level = min(3, self.missed // 2 + 1)
