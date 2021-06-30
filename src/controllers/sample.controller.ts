import { Request, Response } from 'express';
import { AxiosRequestConfig, default as axios } from 'axios';
import config from 'config';
import HttpException from '@exceptions/HttpException';
import { logger } from '@utils/logger';

class SampleController {
  private baseUrl: string = config.get('baseUrl');

  public getSampleResponse = async (req: Request, res: Response): Promise<any> => {
    try {
      const imei = req.params.imei;
      const usaData = await this.getApiData(this.baseUrl + `/usa/${imei}`);
      logger.info('usaData:', usaData);

      if (!usaData.data.isValid) {
        res.send({ data: usaData, message: 'isValid False' });
      }

      const infoData = await this.getApiData(this.baseUrl + `/info/${imei}`);
      logger.info('usaData:', infoData);
      res.status(200).send({ data: infoData, message: 'infoData' });
    } catch (e) {
      console.error(e);
      return Promise.reject(new HttpException(400, 'BadRequest'));
    }
  };

  private async getApiData(url: string): Promise<any> {
    const axiosCfg: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      url: url,
      method: 'GET',
      timeout: 60000,
      headers: {
        accept: 'application/json',
      },
    };

    const response = await axios.request(axiosCfg);
    if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(false);
  }
}

export default SampleController;
