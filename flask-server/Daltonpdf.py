from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community import embeddings
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
import sys

model_local = ChatOllama(model='mistral')


# All 20
pdfs =["./DaltonBackground.pdf", "./Dalton 1.pdf", "./Dalton 2.pdf", "./Dalton 4.pdf", "./Dalton 5.pdf", "./Dalton 6.pdf", "./Dalton 7.pdf", "./Dalton 8.pdf", "./Dalton 9.pdf", "./Dalton 10.pdf", "./Dalton 11.pdf", "./Dalton 13.pdf", "./Dalton 14.pdf", "./Dalton 15.pdf", "./Dalton 16.pdf", "./Dalton 17.pdf", "./Dalton 18.pdf", "./Dalton 19.pdf", "./Dalton 20.pdf"]       


# TEST with 10
#pdfs =["./Dalton 1.pdf", "./Dalton 2.pdf", "./Dalton 4.pdf", "./Dalton 5.pdf", "./Dalton 6.pdf", "./Dalton 7.pdf", "./Dalton 8.pdf", "./Dalton 9.pdf", "./Dalton 10.pdf"]


# Loading our documents and splitting them up

docs = [PyPDFLoader(pdf).load() for pdf in pdfs]
docs_list = [item for sublist in docs for item in sublist]
text_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size=7500, chunk_overlap=100)
doc_splits = text_splitter.split_documents(docs_list)
    

# convert documents to embeddings

vectorstore = Chroma.from_documents(
    documents=doc_splits,
    collection_name="rag-chroma",
    embedding=embeddings.ollama.OllamaEmbeddings(model='nomic-embed-text'),
)
retriever = vectorstore.as_retriever()


# Before RAG (Demo purposes only)

#print("before RAG\n")
#before_rag_tempelate = "{topic}"
#before_rag_prompt = ChatPromptTemplate.from_template(before_rag_tempelate)
#before_rag_chain = before_rag_prompt | model_local | StrOutputParser()
#print(before_rag_chain.invoke({"topic": "How do I remedy period cramps?"}))

#print("\n#######\n After RAG\n")

# Begin RAG
after_rag_template = """ Keep in mind the following rules when generating your response:
    1. Do not exceed a response of 180 words.
    2. Do not cite the sources for your infromation.
    3. Do not mention that you were provided context.
    4. Do favor bulleted lists for readability
    Answer the question based on the following context and ONLY this context: 
    {context}
    Question: {question}

    """
after_rag_prompt = ChatPromptTemplate.from_template(after_rag_template)
after_rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | after_rag_prompt
        | model_local
        | StrOutputParser()
        )

# Execute
answer = after_rag_chain.invoke(sys.argv[1])
print(answer)
