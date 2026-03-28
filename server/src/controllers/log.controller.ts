import type { NextFunction, Request, Response } from 'express';
import { Prisma, LogLevel } from 'generated/prisma/client';
import { prisma } from 'lib/prisma';

export const searchLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, level, userID } = req.query;

    const queryOptions: Prisma.LogsFindManyArgs = {
      take: 51,
      where: {},
    };

    if (id) {
      queryOptions.cursor = { id: parseInt(String(id), 10) };
      queryOptions.skip = 1;
    }

    if (userID) {
      queryOptions.where!.userID = parseInt(String(userID), 10);
    }

    if (level) {
      const search = String(level).toUpperCase() as LogLevel;

      if (Object.values(LogLevel).includes(search)) {
        queryOptions.where!.level = search;
      }
    }

    const logs = await prisma.logs.findMany(queryOptions);

    if (logs.length === 0) {
      return res.status(404).send({
        message: 'Logs not found',
      });
    }

    if (logs.length === 51) {
      logs.pop();
      return res.status(200).send({
        lastCursor: logs.at(-1)?.id,
        logsMessage: logs,
      });
    }

    return res.status(200).send({
      endOfCursor: true,
      logsMessage: logs,
    });
  } catch (error) {
    console.error('[searchLogs Error]:', error);
    return res.status(500).send({
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
