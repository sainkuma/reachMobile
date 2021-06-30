import { Router } from 'express';
import SampleController from '@/controllers/sample.controller';
import Route from '@interfaces/routes.interface';

class TestRoute implements Route {
  public path = '/testRoute';
  public router = Router();
  public sampleController = new SampleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:imei(\\d+)`, this.sampleController.getSampleResponse);
  }
}

export default TestRoute;
