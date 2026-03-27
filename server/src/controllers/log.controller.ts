import type { NextFunction, Request, Response } from 'express';
import { prisma } from 'lib/prisma';
import { log } from 'node:console';
import { skip } from 'node:test';

export const searchLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.query;

    // let logs;

    // if (!id) {
    //   logs = await prisma?.logs.findMany({
    //     take: 51,
    //   });
    // } else {
    //   const idINT = parseInt(id!.toString());
    //   logs = await prisma?.logs.findMany({
    //     skip: 1,
    //     take: 51,
    //     cursor: {
    //       id: idINT,
    //     },
    //   });
    // }

    interface Cursor {
      id: number;
    }

    interface QueryOptions {
      take: number;
      cursor?: Cursor;
      skip?: number;
    }

    const queryOptions: QueryOptions = {
      take: 51,
    };

    if (id) {
      queryOptions.cursor = { id: parseInt(id.toString()) };
      queryOptions.skip = 1;
    }

    const logs = await prisma?.logs.findMany(queryOptions);

    if (!logs) {
      return res.status(404).send({
        message: 'Logs not found',
      });
    }

    if (logs?.length === 51) {
      logs.pop();
      res.status(200).send({
        lastCursor: logs.at(-1)?.id,
        logsMessage: logs,
      });
    } else {
      res.status(200).send({
        endOfCursor: true,
        logsMessage: logs,
      });
    }
  } catch (error) {
    res.status(500).send({
      errorMessage: 'Internal Server Error',
    });
  }
};
