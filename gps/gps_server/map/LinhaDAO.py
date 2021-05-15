import PostgresDB

class LinhaDAO:

 def getLinhasOrdenadasDistancia(self):
    pg = PostgresDB.PostgresDB()
    pg.connect()
    listLinha = []
    query = "SELECT * FROM (SELECT a.lincodigo1, SUM(ST_Distance(ST_Transform(a.geom1,26986),ST_Transform(a.geom2,26986))) as distancia, count(*) as qtd  FROM (select llp1.lincodigo as lincodigo1,llp1.pccadcodigo as lincodigo2,llp2.pccadcodigo, lp1.geom as geom1,lp2.geom as geom2 from life_linha_pc llp1, life_linha_pc llp2, life_pc lp1, life_pc lp2 where llp1.lincodigo = llp2.lincodigo and lp1.pccadcodigo = llp1.pccadcodigo and lp2.pccadcodigo = llp2.pccadcodigo and llp1.linpcsequencia + 1 = llp2.linpcsequencia) a group by a.lincodigo1 order by distancia asc) x WHERE x.qtd > 1"
    cur = pg.executeQuery(query)
    rows = cur.fetchall()
    for row in rows:
        listLinha.append(row[0])
    return listLinha

 def linhaNome(self,lincode):
     pg = PostgresDB.PostgresDB()
     pg.connect()
     query = "select linnome from life_linha where lincodigo = "+str(lincode)
     cur = pg.executeQuery(query)
     return cur.fetchone()
