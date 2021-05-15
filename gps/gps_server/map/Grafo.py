import networkx as nx
from random import randint
import PCDao

class Grafo:

    def montaGrafo(self):
        self.pontosUtilizado = {};
        self.chave = 1;
        self.g=nx.Graph()
        pcDAO = PCDao.PCDao()
        listPC =  pcDAO.pontosCadastrados()
        for key in listPC:
            self.g.add_node(key)
            self.g.node[key]['id'] = key
            self.g.node[key]['chave'] = 0
            self.g.node[key]['tipo'] = "normal"
            self.g.node[key]['caracteristico'] = "";
            self.g.node[key]['latitude'] = 0
            self.g.node[key]['longitude'] = 0

    def addEdge(self,pcList,linha):
        for i in range(0,len(pcList)-1):
            if not self.isNeighbors(pcList[i].codigo,pcList[i+1].codigo):
                self.g.add_edge(pcList[i].codigo,pcList[i+1].codigo)
                if self.g.node[pcList[i].codigo]['chave']== 0:
                    self.g.node[pcList[i].codigo]['chave']=self.chave
                    self.g.node[pcList[i].codigo]['latitude'] = pcList[i].latitude
                    self.g.node[pcList[i].codigo]['longitude'] = pcList[i].longitude
                if self.g.node[pcList[i+1].codigo]['chave']== 0:
                    self.g.node[pcList[i+1].codigo]['chave']=self.chave
                    self.g.node[pcList[i+1].codigo]['latitude'] = pcList[i+1].latitude
                    self.g.node[pcList[i+1].codigo]['longitude'] = pcList[i+1].longitude
                if  self.g.node[pcList[i].codigo]['chave'] != self.g.node[pcList[i+1].codigo]['chave']:
                    self.g.node[pcList[i+1].codigo]['tipo'] = "auxiliar"


        self.g.node[pcList[0].codigo]['caracteristico'] = self.g.node[pcList[0].codigo]['caracteristico'] + str(linha)+" "
        self.g.node[pcList[len(pcList) - 1].codigo]['caracteristico'] = self.g.node[pcList[len(pcList) - 1].codigo]['caracteristico'] + str(linha)+" "
        self.pontosUtilizado[pcList[0].codigo] = ""
        self.pontosUtilizado[pcList[len(pcList) - 1].codigo] = ""
        valor = self.generateRandomValue(pcList)
        self.g.node[pcList[valor].codigo]['caracteristico'] = self.g.node[pcList[valor].codigo]['caracteristico'] + str(linha) + " "
        self.g.node[pcList[len(pcList)-1].codigo]['tipo']="fechamento"
        self.chave = self.chave + 1

    def isNeighbors(self,n1,n2):
      return n2 in self.g.neighbors(n1)

    def generateRandomValue(self,pcList):
        valor = randint(1,len(pcList)-2)
        while pcList[valor] in self.pontosUtilizado:
            valor = randint(1,len(pcList)-2)
        return valor
