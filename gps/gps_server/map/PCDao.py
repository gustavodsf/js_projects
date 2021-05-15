import PostgresDB
import PC

class PCDao:

    def __init__(self):
        self.pg = PostgresDB.PostgresDB()
        self.pg.connect()

    def pontosCadastrados(self):
        listPC = {}
        query = "select pccadcodigo,pccaddescresumida from life_pc"
        cur = self.pg.executeQuery(query)
        rows = cur.fetchall()
        for row in rows:
            listPC[row[0]] = row[1]
        return listPC

    def pcFromLinhas(self,idCodigoLinha):
        listPC = []
        query = "select (SELECT count(llp.id_linha_fk)=1 FROM life_linha_pc llp WHERE llp.pccadcodigo = lpc.pccadcodigo),lpc.linpcsequencia,pc.pccaddescricao,pc.latitude,pc.longitude, pc.pccadauxiliar, pccadchave, tpc.pctdescricao, lpc.pccadcodigo from life_linha_pc lpc JOIN life_pc pc ON lpc.pccadcodigo = pc.pccadcodigo JOIN life_tipo_pc tpc on tpc.pctcodigo = pc.pctcodigo where lincodigo = '"+str(idCodigoLinha)+"' order by linpcsequencia"

        cur = self.pg.executeQuery(query)
        rows = cur.fetchall()
        for row in rows:
            pc = PC.PC()
            pc.caracteristico = row[0]
            pc.sequencia = row[1]
            pc.descricao = row[2]
            pc.latitude = row[3]
            pc.longitude = row[4]
            pc.auxiliar = row[5]
            pc.chave = row[6]
            pc.tipo = row[7]
            pc.codigo = row[8]
            listPC.append(pc)
        return listPC
