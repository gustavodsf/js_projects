import LinhaDAO
import networkx as nx
from networkx.readwrite import json_graph
import matplotlib.pyplot as plt
import PCDao
import json
import Grafo

class MapeamentoLinha:

    def gera (self):
        linhaMapeadas = []
        grafo = Grafo.Grafo()
        grafo.montaGrafo()
        lDao = LinhaDAO.LinhaDAO()
        pcDAO = PCDao.PCDao()

        listLinha = lDao.getLinhasOrdenadasDistancia()
        for linha in listLinha:
            pcList = pcDAO.pcFromLinhas(linha)
            linhaNome = lDao.linhaNome(linha)
            grafo.addEdge(pcList,linha)
            l = self.generateLinha(grafo,pcList,linhaNome,linha)
            linhaMapeadas.append(l)

        grafoHash = {}
        grafoHash["nos"]=grafo.g.nodes(data=True)
        grafoHash["arestas"]=grafo.g.edges()
        grafoHash["linhas"]=linhaMapeadas
        return grafoHash

    def generateLinha(self,grafo,pcList,linhaNome,linhaCodigo):
        seqChave =  ""
        seqPC = ""
        for i in range(0,len(pcList)):
            if i == 0 or i == len(pcList):
                seqChave = seqChave + str(grafo.g.node[pcList[i].codigo]['chave']) + " "
                seqPC = seqPC + str(pcList[i].codigo)+" "
            else:
                if grafo.g.node[pcList[i].codigo]['tipo'] == "auxiliar":
                    seqChave = seqChave + str(grafo.g.node[pcList[i].codigo]['chave']) + " "
                if  str(linhaCodigo) in grafo.g.node[pcList[i].codigo]['caracteristico'] :
                    seqPC = seqPC + str(pcList[i].codigo)+ " "
        linha = {}
        linha["nome"] = linhaNome
        linha["pcs"] = seqChave
        linha["ca"] = seqPC
        return linha
