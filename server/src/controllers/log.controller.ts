import type { NextFunction, Request, Response } from 'express';
import { prisma } from 'lib/prisma';
import { log } from 'node:console';

export const searchLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(500).send({
        errorMessage: 'Please, provide a query string',
      });
    }

    const idINT = parseInt(id.toString());

    const logs = await prisma?.logs.findMany({
      skip: 1,
      take: 50 + 1,
      cursor: {
        id: idINT,
      },
    });

    if (!logs) {
      return res.status(404).send({
        message: 'Logs not founded',
      });
    }

    if (logs?.length === 51) {
      logs.pop();
      res.status(200).send({
        cursor: logs.at(-1)?.id,
        logsMessage: logs,
      });
    } else {
      res.status(200).send({
        endOfCursor: true,
        logsMessage: logs,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
