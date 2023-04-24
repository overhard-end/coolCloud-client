import SparkMD5 from 'spark-md5';

const spark = new SparkMD5();
self.onmessage = (e) => {
  const chunkList = e.data;
  chunkList.forEach((chunk) => {
    spark.append(chunk.chunk);
    let progress = Math.ceil((chunk.index / chunkList.length) * 100);
    self.postMessage({ ready: false, progress: progress });
  });
  const hash = spark.end();
  self.postMessage({ hash: hash, ready: true, progress: 100 });
  self.close();
};

export {};
