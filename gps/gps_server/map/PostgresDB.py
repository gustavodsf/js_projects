import psycopg2

class PostgresDB:
	conn = None

	def connect(self):
		self.conn = psycopg2.connect(host='localhost', port=5432, user='vp', password='vp', dbname='prosolutions-vp')

	def executeQuery (self,query):
		cur = self.conn.cursor()
		cur.execute(query)
		return cur

	def disconnect(self):
		self.conn.close()

	def commit(self):
		self.conn.commit()

	def rollback(self):
		self.conn.rollback()
