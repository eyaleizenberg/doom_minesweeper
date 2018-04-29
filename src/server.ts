import {Router} from 'express';
import * as wixRenderer from 'wix-renderer';
import * as wixRunMode from 'wix-run-mode';
import * as wixExpressRenderingModel from 'wix-express-rendering-model';
import * as wixExpressCsrf from 'wix-express-csrf';
import {root, gamesRoute} from './constants/routes';
import * as bodyParser from 'body-parser';
import {getGamesForUserId, setGameForUserId} from './serverUtilities/storageApi';

module.exports = (app: Router, contextOrConfig) => {
  const config = contextOrConfig.config.load('minesweeper-ts');

  app.use(wixExpressCsrf());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get(root, wrapAsync(async (req, res) => {
    const templatePath = './src/index.ejs';
    const data = {title: 'DOOM Minesweeper'};

    const renderModel = await wixExpressRenderingModel.generate(req, config);
    const html = await wixRenderer.render(templatePath, renderModel, data, wixRunMode.isProduction());

    res.send(html);
  }));

  app.get(gamesRoute, wrapAsync(async (req, res) => {
    getGamesForUserId(req.params.userId).then(games => {
      res.send(games);
    });
  }));

  app.post(gamesRoute, wrapAsync(async (req, res) => {
    const {id, name, state} = req.body;
    const {userId} = req.params;
    setGameForUserId({id, name, state, userId}).then(
      (game) => {
        res.status(200).send(game);
      },
      (error) => {
        res.status(500).send(error);
      }
    );
  }));

  return app;
};

function wrapAsync(asyncFn) {
  return (req, res, next) => asyncFn(req, res, next).catch(next);
}
