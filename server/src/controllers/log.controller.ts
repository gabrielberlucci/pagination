import type { NextFunction, Request, Response } from 'express';
import { Prisma, LogLevel } from 'generated/prisma/client';
import { prisma } from 'lib/prisma';

export const searchLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, level, datetime, userID } = req.query;

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

    interface QueryOptions extends Prisma.LogsFindManyArgs {}

    const queryOptions: QueryOptions = {
      take: 51,
    };

    if (id) {
      queryOptions.cursor = { id: parseInt(id.toString()) };
      queryOptions.skip = 1;
    }

    if (userID) {
      queryOptions.where = {
        userID: parseInt(userID?.toString()),
      };
    }

    if (
      Object.values(LogLevel).includes(
        level?.toString().toUpperCase() as LogLevel,
      )
    ) {
      const search: LogLevel = level?.toString().toUpperCase() as LogLevel;

      queryOptions.where = {
        level: search,
      };
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
    console.log(error);
    res.status(500).send({
      errorMessage: 'Internal Server Error',
    });
  }
};

export const countRows = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const totalCount = await prisma?.logs.count();

    if (!totalCount) {
      return res.status(404).send({
        errorMessage: 'Not found',
      });
    }

    res.status(200).send({
      totalPages: totalCount! / 50,
    });
  } catch (error) {
    console.log(error);
  }
};
