import ftplib

def upload():
    session = ftplib.FTP('ftp.drivehq.com','idrit','blxgre369')
    file = open('textgenrnn_weights.hdf5','rb')                  # file to send
    session.storbinary('STOR textgenrnn_weights.hdf5', file)     # send the file
    file.close()                                    # close file and FTP
    session.quit()
    print('done')
